import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../ui/dialog';
import { Input } from '../../ui/input';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '../../ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../ui/form';
import { Button } from '../../ui/button';
import { toast } from 'sonner';
import { useSignIn } from '../../../features/authApi/useSign';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { AuthFlow } from '../../../types';
import { SignupScreen } from './AuthScreen';

interface LoginModalProp {
  children: React.ReactNode;
}

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: 'Password Must Be Alteat 4 Words!' }),
});

export function LoginModal({ children }: LoginModalProp) {
  const [open, setOpen] = useState<boolean>(false);
  const [currState, setCurrState] = useState<AuthFlow>('signIn');
  const { singin, isPending, isError, isSuccess } = useSignIn();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      await singin({ email: data.email, password: data.password });
    } catch (e) {
      console.log(e);
      toast.error('Something Went Wrong!');
    }
  };

  const handleClose = () => {
    form.reset();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        {currState === 'signIn' ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-center font-lato">
                Sign In
              </DialogTitle>
            </DialogHeader>
            <Separator />
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Your E-Mail"
                          {...field}
                          className="bg-zinc-300/40 focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-[3px]"
                        />
                      </FormControl>
                      <FormMessage className="text-rose-700" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Password"
                          {...field}
                          className="bg-zinc-300/40 focus-visible:ring-0 focus-visible:ring-offset-0 border-none rounded-[3px]"
                        />
                      </FormControl>
                      <FormMessage className="text-rose-700" />
                    </FormItem>
                  )}
                />
                <Button className="bg-black text-white hover:bg-black/80 rounded-[5px] w-full">
                  {isPending ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    `
              Sign In
           `
                  )}
                </Button>
                <p className="text-sm text-muted-foreground">
                  Don't Have Account?{' '}
                  <span
                    className="text-blue-700 cursor-pointer"
                    onClick={() => setCurrState('signUp')}
                  >
                    Sign Up
                  </span>{' '}
                  Here!
                </p>
              </form>
            </Form>
          </>
        ) : (
          <SignupScreen setCurrState={setCurrState} setOpen={setOpen} />
        )}
      </DialogContent>
    </Dialog>
  );
}
