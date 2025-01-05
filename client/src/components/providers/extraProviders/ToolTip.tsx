import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../ui/tooltip';

type side = 'top' | 'right' | 'bottom' | 'left';
type align = 'start' | 'center' | 'end';

interface ToolTipProps {
  children: React.ReactNode;
  side: side;
  align: align;
  label: string;
}
const ToolTip = ({ align, children, side, label }: ToolTipProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent align={align} side={side} className="bg-white p-2">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
