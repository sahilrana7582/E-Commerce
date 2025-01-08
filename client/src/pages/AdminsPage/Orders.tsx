import { Box, EllipsisVertical, Loader, Trash } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
} from '../../components/ui/table';
import { useAllOrder } from '../../features/order/useAllOrder';
import { OrdersResponse, statusType } from '../../types';
import ToolTip from '../../components/providers/extraProviders/ToolTip';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from '../../components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { useEditOrder } from '../../features/order/useEditStatus';

const Orders = () => {
  const { allOrders, isLoading } = useAllOrder();
  const { editOrder, isPending } = useEditOrder();

  const orderResponse: OrdersResponse = allOrders;

  const handleChangeState = (id: string, data: statusType) => {
    editOrder({ id, status: data });
  };

  return (
    <div className="relative max-h-screen overflow-hidden border ">
      <Table className="table-auto w-full">
        <TableCaption>A list of received order</TableCaption>
      </Table>
      <div className="max-h-screen overflow-y-auto">
        <Table className="table-auto w-full mb-4 ">
          <TableBody>
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader className="w-4 h-4 animate-spin" />
              </div>
            ) : (
              <>
                {orderResponse.map((order) => (
                  <TableRow>
                    <div className="border-b p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Box className="  w-10 h-10" />
                        <div className="space-y-2">
                          <small className="text-sm font-medium leading-none">
                            {order.buyerInfo.firstName}{' '}
                            {order.buyerInfo.lastName}
                          </small>
                          {order.items.map((item) => (
                            <p className="text-sm text-muted-foreground border-b">
                              {item.product.name} [ {item.size} ] x
                              {item.quantity}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="leading-7 ">Shipping Address</p>
                        <div className="flex gap-2">
                          <small className="text-sm font-semibold leading-none">
                            Street Name:
                          </small>{' '}
                          <small className="text-sm font-medium leading-none">
                            {order.shippingInfo.streetName}
                          </small>
                        </div>
                        <div className="grid grid-cols-2">
                          <small className="text-sm font-semibold leading-none">
                            Pincode:
                          </small>{' '}
                          <small className="text-sm font-medium leading-none">
                            {order.shippingInfo.pincode}
                          </small>
                        </div>{' '}
                        <div className="flex gap-2">
                          <small className="text-sm font-semibold leading-none">
                            City, State:
                          </small>{' '}
                          <small className="text-sm font-medium leading-none">
                            {order.shippingInfo.city},{' '}
                            {order.shippingInfo.state},{' '}
                            {order.shippingInfo.country}
                            {''}
                          </small>
                        </div>{' '}
                        <div className="flex gap-2">
                          <small className="text-sm font-semibold leading-none">
                            Phone Number:
                          </small>{' '}
                          <small className="text-sm font-medium leading-none">
                            {order.shippingInfo.phoneNumber}
                          </small>
                        </div>
                        <div className="flex gap-2 items-center mt-2">
                          <small className="text-sm font-semibold text-red-600 leading-none">
                            Status:
                          </small>{' '}
                          <Select
                            defaultValue="ORDERED"
                            onValueChange={(value: statusType) =>
                              handleChangeState(order.id, value)
                            }
                          >
                            <SelectTrigger>{order.status}</SelectTrigger>
                            <SelectContent className="bg-white">
                              <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem
                                  value="ORDERED"
                                  className="cursor-pointer"
                                >
                                  Ordered
                                </SelectItem>
                                <SelectItem
                                  value="PROCESSING"
                                  className="cursor-pointer"
                                >
                                  Processing
                                </SelectItem>
                                <SelectItem
                                  value="CONFIRMED"
                                  className="cursor-pointer"
                                >
                                  Confirmed
                                </SelectItem>
                                <SelectItem
                                  value="PACKED"
                                  className="cursor-pointer"
                                >
                                  Packed
                                </SelectItem>
                                <SelectItem
                                  value="OUT_FOR_DELIVERY"
                                  className="cursor-pointer"
                                >
                                  Out for Delivery
                                </SelectItem>
                                <SelectItem
                                  value="DELIVERED"
                                  className="cursor-pointer"
                                >
                                  Delivered
                                </SelectItem>
                                <SelectItem
                                  value="CANCELLED"
                                  className="cursor-pointer"
                                >
                                  Cancelled
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <ToolTip align="center" label="Edit Status" side="left">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <EllipsisVertical className="cursor-pointer" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem className="text-rose-600 hover:text-rose-700 cursor-pointer">
                                <Trash className="text-rose-600" />
                                Delete Order
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </ToolTip>
                    </div>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Orders;
