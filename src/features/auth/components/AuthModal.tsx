import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

export const AuthModal = ({ isOpen, onClose, initialView = 'login' }: AuthModalProps) => {
  const { t } = useTranslation();
  const [view, setView] = useState<'login' | 'register'>(initialView);

  // Sync state with props whenever modal opens or initialView changes
  useEffect(() => {
    if (isOpen) {
      setView(initialView);
    }
  }, [isOpen, initialView]);

  const toggleView = () => {
    setView(view === 'login' ? 'register' : 'login');
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px] bg-card rounded-2xl p-0 gap-0 overflow-hidden border-none shadow-2xl">
        <DialogHeader className="p-6 pb-2 relative">
          <DialogTitle className="text-center text-xl font-bold text-primary font-display">
            {view === 'login' ? t('auth.login.title') : t('auth.register.title')}
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2">
          {view === 'login' ? <LoginForm /> : <RegisterForm />}

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground font-sans">
            {view === 'login' ? (
              <>
                {t('auth.login.no_account')}
                <button
                  onClick={toggleView}
                  className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors duration-300"
                >
                  {t('auth.login.switch_to_register')}
                </button>
              </>
            ) : (
              <>
                {t('auth.register.has_account')}
                <button
                  onClick={toggleView}
                  className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors duration-300"
                >
                  {t('auth.register.switch_to_login')}
                </button>
              </>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
