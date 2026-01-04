import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
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

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-muted-foreground">{t('auth.fields.email.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('auth.fields.email.placeholder')}
                    type="email"
                    className="font-sans rounded-xl bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all duration-300 h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-1">
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-muted-foreground">{t('auth.fields.password.label')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('auth.fields.password.placeholder')}
                      type="password"
                      className="font-sans rounded-xl bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all duration-300 h-12 text-lg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end mt-1">
              <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors duration-300 font-sans">
                {t('auth.login.forgot_password')}
              </a>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-sans rounded-xl h-11 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            {isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}
          </Button>
        </form>
      </Form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground font-sans">{t('auth.general.or_continue_with')}</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full gap-2 font-sans rounded-xl h-11 border-input hover:bg-accent hover:text-primary transition-all duration-300"
      >
        <FontAwesomeIcon icon={faGoogle} className="text-red-500" />
        {t('auth.general.google')}
      </Button>
    </div>
  );
};
