const STTextArea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => {
  return <textarea className="font-body1 text-foreground bg-background border border-border w-full min-h-[33vh] p-2" {...props} />;
};

export default STTextArea;