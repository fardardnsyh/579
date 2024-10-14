'use server';

import { messagesFetchLimit } from '@/constants';
import { getSession, updateSession } from '@/lib/session';
import connectToDatabase from '@/lib/connect-to-database';
import Message, { MessageInterface } from '@/models/message';
import { z } from 'zod';

export const sendMessage = async (
  userId: any,
  previousState: any,
  formData: FormData
) => {
  //   console.log('previousState', previousState);
  //   console.log('userId', userId);
  //   console.log('formData', formData);

  const message = formData.get('message');

  const { success, error, data } = z
    .string()
    .min(1, 'Enter a message')
    .min(3, 'Message is too short')
    .safeParse(message);

  if (!success) {
    console.log('error.format()._errors', error.format()._errors);
    return { errors: error.format()._errors };
  }

  try {
    await connectToDatabase();
    // send message
    await Message.create({
      user_id: userId,
      message: data,
    });

    return { success: true };
  } catch (error: any) {
    console.log('[SERVER_ACTION_ERROR]', error);
    return { error: 'Something went wrong' };
  }
};

export const getMessages = async (
  page: number,
  previousState: any,
  formData: FormData
) => {
  const pageNumber = page && Math.ceil(page) > 0 ? Math.ceil(page) : 1;
  const limitNumber = messagesFetchLimit;

  try {
    await connectToDatabase();
    const session = await getSession();

    if (!session) {
      return { error: 'Unauthorized' };
    }

    await updateSession();

    const data = await Message.find<MessageInterface>({
      user_id: session.user_id,
    })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)

      .exec();

    // total_records
    const total_records = await Message.countDocuments({
      user_id: session.user_id,
    });
    // total_pages
    const total_pages = Math.ceil(total_records / limitNumber);
    // current_page
    const current_page = pageNumber;
    // previous_page
    const previous_page = pageNumber === 1 ? null : pageNumber - 1;
    // next_page
    const next_page =
      total_pages === 0 || pageNumber === total_pages ? null : pageNumber + 1;

    console.log('data', data);

    const result = {
      data,
      pagination: {
        total_records,
        total_pages,
        current_page,
        previous_page,
        next_page,
      },
    };

    console.log('returned result', result);

    return {
      success: true,
      data,
      pagination: {
        total_records,
        total_pages,
        current_page,
        previous_page,
        next_page,
      },
    };
    // return result;
  } catch (error: any) {
    console.log('[MESSAGES_FETCH_ERROR]', error);
    return { error: 'An error occured' };
  }
};
