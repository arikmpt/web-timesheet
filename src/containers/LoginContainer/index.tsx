import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginContainer() {
  return (
    <Card className='w-[350px]'>
      <CardHeader>
        <CardTitle className='text-center'>Sign In</CardTitle>
        <CardDescription className='text-center'>
          Please sign in to our platform to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='grid w-full items-center gap-4'>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='email'>Email Address</Label>
            <Input id='email' placeholder='example@email.com' type='email' />
          </div>
          <div className='flex flex-col space-y-1.5'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' placeholder='********' type='password' />
          </div>
        </div>
      </CardContent>
      <CardFooter className='flex flex-col gap-3'>
        <Button className='w-full'>Login</Button>
        <Button className='w-full' variant={'link'}>
          Reset Password
        </Button>
      </CardFooter>
    </Card>
  );
}
