export const fetchImageUrl = async (fileId: number): Promise<string> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/files/${fileId}`
  );
  
  if (!response.ok) {
    console.error(`Failed to fetch image`);

    return "/images/placeholder.png";
  }

  return `${process.env.NEXT_PUBLIC_API_URL}/files/${fileId}`;
};
