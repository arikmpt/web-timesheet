import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Control, FieldValues, Path } from 'react-hook-form';
import { Input } from '../ui/input';

type IProps<T extends FieldValues> = Pick<
  React.ComponentProps<'input'>,
  'placeholder' | 'type' | 'disabled'
> & {
  name: Path<T>;
  control: Control<T, object>;
  label?: string;
};

export default function FormInput<T extends FieldValues>({
  type,
  placeholder,
  name,
  control,
  label,
  disabled,
}: IProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type}
              disabled={disabled}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
