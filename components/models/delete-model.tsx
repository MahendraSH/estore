"use client";
import { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Model from "../ui/model";

interface DeleteModelProps {
  isOpen: boolean;
  onClose: () => void;
  onDelelete: () => void;
  loading: boolean;
}

const DeleteModel: FC<DeleteModelProps> = ({
  isOpen,
  onClose,
  onDelelete,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Model
      title="Are you sure?"
      description="This action cannot be undone."
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button disabled={loading} variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading}  onClick={onDelelete}>
          Continue
        </Button>
      </div>
    </Model>
  );
};

export default DeleteModel;
