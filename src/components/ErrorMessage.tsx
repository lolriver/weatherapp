import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white/15 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-10 border border-white/20 shadow-2xl text-center max-w-md w-full">
        <div className="p-3 sm:p-4 bg-red-500/20 rounded-xl sm:rounded-2xl w-fit mx-auto mb-4 sm:mb-6">
          <AlertCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-300" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent mb-2 sm:mb-3">Something went wrong</h2>
        <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 sm:gap-3 mx-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/20 active:bg-white/30 rounded-xl sm:rounded-2xl text-white font-semibold transition-all duration-200 shadow-lg active:scale-95 border border-white/20 active:border-white/30 touch-action-manipulation"
          >
            <div className="p-1 bg-white/20 rounded-lg">
              <RefreshCw className="w-4 h-4" />
            </div>
            <span className="text-sm sm:text-base">Try Again</span>
          </button>
        )}
      </div>
    </div>
  );
};