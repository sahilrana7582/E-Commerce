import { useForm } from 'react-hook-form';
import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
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
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { AuthFlow } from '../../../types';

interface LoginModalProp {
  setCurrState: (data: AuthFlow) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const formSchema = z.object({
  firstName: z.string().min(1, { message: 'Name should be atleast 4 words!' }),
  lastName: z.string().min(1, { message: 'Name should be atleast 4 words!' }),
  email: z.string().email(),
  password: z.string().min(4, { message: 'Password Must Be Alteat 4 Words!' }),
});

export function SignupScreen({ setCurrState, setOpen }: LoginModalProp) {
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
    setOpen((prev: boolean) => !prev);
  };

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess, isError]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center font-lato">Sign Up</DialogTitle>
        <DialogDescription className="text-center">
          Make Yourself new account here!
        </DialogDescription>
      </DialogHeader>
      <Separator />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="First Name"
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Last Name"
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
              Sign Up
           `
            )}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already Have Account?{' '}
            <span
              className="text-blue-700 cursor-pointer"
              onClick={() => setCurrState('signIn')}
            >
              Sign In
            </span>{' '}
            Here!
          </p>
        </form>
      </Form>
    </>
  );
}
