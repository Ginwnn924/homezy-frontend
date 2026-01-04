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

export const RegisterForm = () => {
  const { t } = useTranslation();

  const registerSchema = z.object({
    fullName: z.string().min(2, t('auth.validation.fullname_min')),
    phone: z.string().regex(/^[0-9]{10,11}$/, t('auth.validation.phone_invalid')),
    email: z.string().email(t('auth.validation.email_invalid')),
    password: z.string().min(6, t('auth.validation.password_min')),
  });

  type RegisterFormData = z.infer<typeof registerSchema>;

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: RegisterFormData) => {
    // TODO: Call API register
    console.log('Register Data:', data);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-muted-foreground">{t('auth.fields.fullname.label')}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t('auth.fields.fullname.placeholder')}
                    className="font-sans rounded-xl bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all duration-300 h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-muted-foreground">{t('auth.fields.phone.label')}</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder={t('auth.fields.phone.placeholder')}
                    className="font-sans rounded-xl bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all duration-300 h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-muted-foreground">{t('auth.fields.email.label')}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t('auth.fields.email.placeholder')}
                    className="font-sans rounded-xl bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all duration-300 h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-sans text-muted-foreground">{t('auth.fields.password.label')}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t('auth.fields.password.placeholder')}
                    className="font-sans rounded-xl bg-background border-input focus:border-primary focus:ring-1 focus:ring-primary/10 transition-all duration-300 h-12 text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-sm text-muted-foreground text-center font-sans">
            {t('auth.register.terms_prefix')}
            <a href="#" className="text-primary hover:text-primary/80 hover:underline transition-colors duration-300">{t('auth.register.terms_link')}</a>
            {' '}&{' '}
            <a href="#" className="text-primary hover:text-primary/80 hover:underline transition-colors duration-300">{t('auth.register.privacy_link')}</a>
            {t('auth.register.terms_suffix')}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground font-sans rounded-xl h-11 transition-all duration-300 shadow-lg shadow-primary/20"
          >
            {isSubmitting ? t('auth.register.submitting') : t('auth.register.submit')}
          </Button>
        </form>
      </Form>
    </div>
  );
};
