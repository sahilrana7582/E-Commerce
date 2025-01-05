import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useAddress } from '../../features/addressApi/useAddress';
import { Loader } from 'lucide-react';

const Cart = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { addressInfo, isLoading: addressLoading } = useAddress();
  const total = useSelector((state: RootState) => state.cart.total);
  const tax = (total * 0.2).toFixed(2);
  console.log(addressInfo);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col  h-full overflow-auto">
        <h2 className="text-4xl font-bold font-lato mb-4 text-gray-800">
          Shopping Bag
        </h2>
        <Card className="shadow-lg border rounded-lg max-h-screen overflow-hidden">
          <CardContent className="h-full flex flex-col justify-between py-6 overflow-auto">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[300px]">
                <p className="text-lg text-gray-500">Your cart is empty</p>
                <Button
                  variant="link"
                  className="mt-4 text-blue-500"
                  onClick={() => navigate('/collection')}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div className="flex items-center justify-center border-b pb-6">
                    <div className="w-1/3 flex justify-center items-center h-full">
                      <img
                        src={item.mainImg}
                        alt={item.name}
                        className="w-full h-48 object-cover rounded-lg shadow-lg"
                      />
                    </div>

                    <div className="flex-1 pl-6">
                      <p className="font-semibold text-xl text-gray-800">
                        {item.name}
                      </p>
                      <p className="text-gray-500">{item.sizes}</p>

                      <div className="flex items-center justify-between mt-4">
                        <span className="text-2xl font-semibold text-gray-900">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 h-full overflow-auto">
        <h3 className="text-xl font-semibold text-gray-800 border-b pb-2 mb-4">
          Order Summary
        </h3>
        <div className="mb-6">
          <h4 className="text-lg font-medium text-gray-800 mb-2">
            Delivery Address
          </h4>
          <div className="space-y-2 text-gray-600">
            {addressLoading ? (
              <Loader /> // This is where you show the loading spinner
            ) : !addressInfo ? (
              <p className="text-red-500">
                Address information is not available.
              </p> // Show a fallback if addressInfo is undefined or null
            ) : (
              <>
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-500">
                    Street Number :{' '}
                  </p>
                  <p className="text-lg font-medium text-gray-500">
                    {addressInfo.streetName}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-500">Address: </p>
                  <p className="text-lg font-medium text-gray-500">
                    {addressInfo.city}, {addressInfo.state} -{' '}
                    {addressInfo.pincode}
                  </p>
                </div>

                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-500">Country: </p>
                  <p className="text-lg font-medium text-gray-500">
                    {addressInfo.country}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-medium text-gray-500">Phone: </p>
                  <p className="text-lg font-medium text-gray-500">
                    {addressInfo.phoneNumber}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">${tax}</span>
          </div>
          <div className="border-t pt-4 flex justify-between items-center">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-xl text-gray-900">
              ${Number(Number(total) + Number(tax)).toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          variant="default"
          className="w-full mt-6 bg-black/90 hover:bg-black text-white rounded-[5px]"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
