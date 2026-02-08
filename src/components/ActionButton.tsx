const ActionButton = ({ label }: { label: string }) => {
  return (
    <button className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 transition text-sm font-medium">
      {label}
    </button>
  );
};

export default ActionButton;
