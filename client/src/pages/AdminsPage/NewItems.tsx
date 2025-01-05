import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Label } from '@radix-ui/react-label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import useAuth from '../../hooks/useAuth';
import { ProductType } from '../../types';
import { useAddProduct } from '../../features/productApi/useAddProduct';
import { Loader } from 'lucide-react';
import { MyDropzone } from './Dropzone';
import { useState } from 'react';

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  description: z
    .string()
    .min(10, { message: 'Description must be at least 10 characters long' })
    .max(5000, { message: 'Description is too long' }),
  category: z.enum(['Male', 'Female'], {
    message: 'Category is required and must be Male or Female',
  }),
  subCategory: z.enum(['TopWear', 'BottomWear'], {
    message: 'SubCategory is required and must be TopWear or BottomWear',
  }),
  price: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0, {
      message: 'Price must be a valid number greater than 0',
    })
    .transform((value) => parseFloat(value)),
  sizes: z.array(z.enum(['SMALL', 'MEDIUM', 'LARGE', 'XL', 'XXL'])).min(1, {
    message: 'At least one size must be selected',
  }),
  bestSeller: z.boolean().optional(),
});

const sizesOptions = [
  { label: 'S', value: 'SMALL' },
  { label: 'M', value: 'MEDIUM' },
  { label: 'L', value: 'LARGE' },
  { label: 'XL', value: 'XL' },
  { label: 'XXL', value: 'XXL' },
];

const NewItem = () => {
  const [imgs, setImgs] = useState<string[]>([]);

  const { user } = useAuth();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      sizes: [],
      bestSeller: false,
    },
  });

  const { addProduct, isPending } = useAddProduct(form.reset);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    const productInfo: ProductType = {
      ...data,
      seller: user.id,
      imgs,
    };

    addProduct(productInfo);
  };

  return (
    <div className="space-y-6">
      <MyDropzone setImgs={setImgs} imgs={imgs} />
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Label htmlFor="name">Product Name</Label>
                    <Input placeholder="Product Name" {...field} />
                  </>
                </FormControl>

                <FormMessage className="text-red-800" />
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <>
                    <Label htmlFor="name">Description</Label>
                    <Textarea placeholder="Product Description" {...field} />
                  </>
                </FormControl>

                <FormMessage className="text-red-800" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3">
            <FormField
              name="subCategory"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="subCategory">Sub Category</Label>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px] ">
                          <SelectValue placeholder="Sub-Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            <SelectLabel>Sub-Category</SelectLabel>
                            <SelectItem value="TopWear">TopWear</SelectItem>
                            <SelectItem value="BottomWear">
                              BottomWear
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />

            <FormField
              name="category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="category">Category</Label>

                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-[180px] ">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="Male">Male</SelectItem>
                            <SelectItem value="Female">Female</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </>
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
            <FormField
              name="price"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <>
                      <Label htmlFor="price">Price</Label>
                      <Input placeholder="Price" {...field} />
                    </>
                  </FormControl>

                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="sizes"
            render={({ field }) => (
              <>
                <div className="flex gap-5">
                  {sizesOptions.map((size) => (
                    <div
                      key={size.value}
                      className={`p-4 mb-2 min-w-12 min-h-12 text-center rounded-[5px] border  cursor-pointer ${
                        field.value.includes(
                          size.value as
                            | 'SMALL'
                            | 'MEDIUM'
                            | 'LARGE'
                            | 'XL'
                            | 'XXL'
                        )
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                      onClick={() => {
                        const isSelected = field.value.includes(
                          size.value as
                            | 'SMALL'
                            | 'MEDIUM'
                            | 'LARGE'
                            | 'XL'
                            | 'XXL'
                        );
                        if (isSelected) {
                          field.onChange(
                            field.value.filter((val) => val !== size.value)
                          );
                        } else {
                          field.onChange([...field.value, size.value]);
                        }
                      }}
                    >
                      <span className="font-medium">{size.label}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          />
          <div className="flex gap-4">
            <Button
              type="submit"
              className="bg-black rounded-[5px] hover:bg-black text-white"
            >
              {isPending ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                'Add Product'
              )}
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-800 rounded-[5px] text-white"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewItem;
