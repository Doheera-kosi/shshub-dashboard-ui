import { motion } from "framer-motion";

const ProgressBar = ({ value, color, className, wrapperClassName, height = 'h-2', label }: { value: number, color?: string, className?: string, wrapperClassName?: string, height?: string, label?: string }) => {
  return (
    <div className={`w-full bg-gray-200 rounded-full ${height} relative ${wrapperClassName || ''}`}>
      <motion.div
        className={`h-full rounded-full ${className}`}
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1 }}
      ></motion.div>
      {label && (
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-gray-600 text-[10px] font-bold">{label}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;