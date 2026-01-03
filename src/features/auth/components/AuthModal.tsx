import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Modal } from '../../../components/ui/Modal';
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={view === 'login' ? t('auth.login.title') : t('auth.register.title')}
    >
      <div className="mt-2">
        {view === 'login' ? <LoginForm /> : <RegisterForm />}

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
          {view === 'login' ? (
            <>
              {t('auth.login.no_account')}
              <button
                onClick={toggleView}
                className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                {t('auth.login.switch_to_register')}
              </button>
            </>
          ) : (
            <>
              {t('auth.register.has_account')}
              <button
                onClick={toggleView}
                className="font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                {t('auth.register.switch_to_login')}
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
