import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react';
import ConfirmModal, { ConfirmModalProps } from '@/components/molecules/modals/ConfirmModal';

type ConfirmOptions = Omit<ConfirmModalProps, 'visible' | 'onCancel' | 'onConfirm'>;

type ConfirmContextValue = {
  confirm: (opts?: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextValue | null>(null);

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [opts, setOpts] = useState<ConfirmOptions>({
    title: 'Exit app?',
    message: 'Are you sure you want to exit?',
    confirmText: 'Exit',
    cancelText: 'Cancel',
    destructive: true,
  });

  const resolverRef = useRef<((v: boolean) => void) | null>(null);

  const confirm = useCallback((options: ConfirmOptions = {}) => {
    return new Promise<boolean>((resolve) => {
      setOpts((prev) => ({ ...prev, ...options }));
      resolverRef.current = resolve;
      setVisible(true);
    });
  }, []);

  const onCancel = useCallback(() => {
    setVisible(false);
    resolverRef.current?.(false);
  }, []);

  const onConfirm = useCallback(() => {
    setVisible(false);
    resolverRef.current?.(true);
  }, []);

  const value = useMemo(() => ({ confirm }), [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      <ConfirmModal visible={visible} onCancel={onCancel} onConfirm={onConfirm} {...opts} />
    </ConfirmContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error('useConfirm must be used inside <ConfirmProvider>');
  return ctx;
}
