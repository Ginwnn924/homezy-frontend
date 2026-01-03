import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { toast } from 'sonner';
import { authApi } from '../api/authApi';

export const LoginForm = () => {
  const { t } = useTranslation();

  const loginSchema = z.object({
    email: z.string().email(t('auth.validation.email_invalid')),
    password: z.string().min(6, t('auth.validation.password_min')),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await authApi.login(data);
      if (result.statusCode === 200) {
        toast.success(result.message);
      }
      else {
        toast.error(result.message);
      }


    } catch (error) {
      console.error('Login Error:', error);
      toast.error(error instanceof Error ? error.message : t('auth.login.error'));
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          id="email"
          label={t('auth.fields.email.label')}
          type="email"
          placeholder={t('auth.fields.email.placeholder')}
          error={errors.email?.message}
          {...register('email')}
        />

        <div className="space-y-1">
           <Input
            id="password"
            label={t('auth.fields.password.label')}
            type="password"
            placeholder={t('auth.fields.password.placeholder')}
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="flex justify-end">
            <a href="#" className="text-sm font-medium text-primary-600 hover:text-primary-500 hover:underline">
              {t('auth.login.forgot_password')}
            </a>
          </div>
        </div>

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting}
          className="mt-2"
        >
          {isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">{t('auth.general.or_continue_with')}</span>
        </div>
      </div>

      <Button variant="outline" fullWidth className="gap-2">
        <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
        {t('auth.general.google')}
      </Button>
    </div>
  );
};
