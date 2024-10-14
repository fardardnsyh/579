'use client';

import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  FC,
  useState,
} from 'react';
import { Label } from '@/components/ui/label';
import { Textarea } from './ui/textarea';
import { cn } from '@/lib/helpers/cn';

interface TextareaInputProps extends ComponentPropsWithoutRef<typeof Textarea> {
  label?: string;
  error?: string;
}

type TextareaInputRef = ElementRef<typeof Textarea>; //HTMLInputElement

const TextareaInput = React.forwardRef<TextareaInputRef, TextareaInputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <>
        <div className="w-full">
          <Label htmlFor={id}>{label}</Label>
          <Textarea
            id={id}
            className={cn(
              'shadow-[0_1px_2px_rgba(16,_24,_40,_0.05)] text-base leading-[140%] tracking-[-0.4%]',
              `${error && 'border-destructive'}`,
              className
            )}
            ref={ref}
            {...props}
          />

          <span className="text-xs text-destructive">{error}</span>
        </div>
      </>
    );
  }
);

export default TextareaInput;
