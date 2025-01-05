interface Prop {
  setImg: React.Dispatch<React.SetStateAction<string>>;
  imgs: string[];
}

const ProductImages = ({ setImg, imgs }: Prop) => {
  return (
    <div className="flex flex-col overflow-y-auto h-full gap-4 ">
      {imgs.map((ele) => (
        <img
          src={ele}
          onClick={() => setImg(ele)}
          className="object-fill rounded-[5px]"
        />
      ))}
    </div>
  );
};

export default ProductImages;
