import { useForm } from 'react-hook-form';

export default function InputForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return <form></form>;
}
