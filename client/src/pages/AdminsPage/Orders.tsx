import { Box, EllipsisVertical, Loader } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableRow,
} from '../../components/ui/table';
import { useAllOrder } from '../../features/order/useAllOrder';
import { OrdersResponse } from '../../types';
import ToolTip from '../../components/providers/extraProviders/ToolTip';

const Orders = () => {
  const { allOrders, isLoading } = useAllOrder();

  const orderResponse: OrdersResponse = allOrders;

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
                      </div>
                      <ToolTip align="center" label="Edit Status" side="left">
                        <EllipsisVertical />
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
