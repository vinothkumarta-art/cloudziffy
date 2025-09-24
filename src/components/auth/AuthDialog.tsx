import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFilterStore } from '@/lib/store';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});
const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z.string().min(6, { message: 'Password is required.' }),
});
type SignupFormValues = z.infer<typeof signupSchema>;
type LoginFormValues = z.infer<typeof loginSchema>;
export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const signup = useFilterStore((state) => state.signup);
  const login = useFilterStore((state) => state.login);
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors },
    reset: resetSignupForm,
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    reset: resetLoginForm,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });
  const onSignup = async (data: SignupFormValues) => {
    setIsLoading(true);
    try {
      await signup(data);
      toast.success('Account created successfully! You are now logged in.');
      setOpen(false);
      resetSignupForm();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account.');
    } finally {
      setIsLoading(false);
    }
  };
  const onLogin = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Logged in successfully!');
      setOpen(false);
      resetLoginForm();
    } catch (error: any) {
      toast.error(error.message || 'Invalid email or password.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full border-blue-800 text-blue-800 hover:bg-blue-50 hover:text-blue-900 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/50 dark:hover:text-blue-300">
          Login / Sign Up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Welcome to SavvySphere</DialogTitle>
          <DialogDescription>
            Access your account or create a new one to save your favorite deals.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleLoginSubmit(onLogin)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="m@example.com" {...registerLogin('email')} />
                {loginErrors.email && <p className="text-sm text-red-500">{loginErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input id="login-password" type="password" {...registerLogin('password')} />
                {loginErrors.password && <p className="text-sm text-red-500">{loginErrors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-blue-800 hover:bg-blue-900" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSignupSubmit(onSignup)} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Name</Label>
                <Input id="signup-name" placeholder="John Doe" {...registerSignup('name')} />
                {signupErrors.name && <p className="text-sm text-red-500">{signupErrors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="m@example.com" {...registerSignup('email')} />
                {signupErrors.email && <p className="text-sm text-red-500">{signupErrors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" {...registerSignup('password')} />
                {signupErrors.password && <p className="text-sm text-red-500">{signupErrors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}