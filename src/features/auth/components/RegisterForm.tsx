import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';

export const RegisterForm = () => {
  const { t } = useTranslation();

  const registerSchema = z.object({
    fullName: z.string().min(2, t('auth.validation.fullname_min')),
    phone: z.string().regex(/^[0-9]{10,11}$/, t('auth.validation.phone_invalid')),
    email: z.string().email(t('auth.validation.email_invalid')),
    password: z.string().min(6, t('auth.validation.password_min')),
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Call API register
    console.log('Register Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="fullName"
          label={t('auth.fields.fullname.label')}
          placeholder={t('auth.fields.fullname.placeholder')}
          error={errors.fullName?.message}
          {...register('fullName')}
        />

        <Input
          id="phone"
          label={t('auth.fields.phone.label')}
          type="tel"
          placeholder={t('auth.fields.phone.placeholder')}
          error={errors.phone?.message}
          {...register('phone')}
        />

        <Input
          id="email"
          label={t('auth.fields.email.label')}
          type="email"
          placeholder={t('auth.fields.email.placeholder')}
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          id="password"
          label={t('auth.fields.password.label')}
          type="password"
          placeholder={t('auth.fields.password.placeholder')}
          error={errors.password?.message}
          {...register('password')}
        />

        <div className="text-sm text-gray-500 text-center">
          {t('auth.register.terms_prefix')}
          <a href="#" className="text-primary-600 hover:underline">{t('auth.register.terms_link')}</a>
          {' '}&{' '}
          <a href="#" className="text-primary-600 hover:underline">{t('auth.register.privacy_link')}</a>
          {t('auth.register.terms_suffix')}
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? t('auth.register.submitting') : t('auth.register.submit')}
        </Button>
      </form>
    </div>
  );
};
