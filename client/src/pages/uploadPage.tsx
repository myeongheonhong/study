import { SubmitHandler, useForm } from 'react-hook-form';

interface InputType {
  title: string;
  image: FileList;
}

export default function UploadPage() {
  const { register, watch, handleSubmit } = useForm<InputType>({
    mode: 'onChange',
    defaultValues: {},
  });

  const accessToken = sessionStorage.getItem('access-token');

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const formData = new FormData();

    formData.append('title', data.title);
    data.image[0] && formData.append('image', data.image[0]);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/partners/upload`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Upload Page</h1>

        <label>
          <h3>이름</h3>
          <input {...register('title')} />
        </label>

        <label>
          <h3>이미지</h3>
          <input type="file" accept="image/*" {...register('image')} />
        </label>

        {/* <button onClick={postUpload}>업로드</button> */}

        <button type="submit">Upload</button>
      </form>
    </>
  );
}
