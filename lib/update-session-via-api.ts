const updateSessionViaAPI = async () => {
  // const response = await fetch('http://localhost:3000/api/session', {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/api/session`,
    {
      method: 'PUT',
      credentials: 'include',
    }
  );

  if (!response.ok) {
    console.log('session update via api failed');
  }

  const result = await response.json();

  return result;
};

export default updateSessionViaAPI;
