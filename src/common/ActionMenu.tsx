import {useEffect, useRef } from "react";
import { Menu } from "lucide-react";

type ActionMenuProps<T> = {
  item: T;
  openMenuId: number | null;
  setOpenMenuId: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onAuditLog?: (item: T) => void;
  onCollect?:(item:T)=>void;
  onAck?:(item:T)=>void;
  onValidate?: (item: T) => void;
  onReject?: (item: T) => void;

};

export function ActionMenu<T>({
  item,
  onView,
  onEdit,
  onDelete,
  onAuditLog,
  onCollect,
  onAck,
  onValidate,
  onReject,
  openMenuId,
  setOpenMenuId
}: ActionMenuProps<T>) {

  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenMenuId]);

  const handleToggle = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  e.stopPropagation();

  const rowId = (item as any).id;

  setOpenMenuId(
    openMenuId === rowId ? null : rowId
  );
};


  const handleAction = (cb?: (item: T) => void) => {
    cb?.(item);
    setOpenMenuId(null);
  };

  return (
    <div ref={menuRef} className="menu-container relative inline-block"
>
      {/* BUTTON */}
      <button
        onClick={handleToggle}
        className="p-2 rounded hover:bg-gray-100"
      >
        <Menu size={18} />
      </button>

      {/* DROPDOWN */}
      {openMenuId === (item as any).id && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white border border-blue-500/20 rounded-lg shadow-lg z-50"
          >
          {onView && (
            <button
              onClick={() => handleAction(onView)}
              className="block w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
            >
              View
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => handleAction(onEdit)}
              className="block w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
            >
              Edit
            </button>
          )}
          {onAuditLog && (
            <button
              onClick={() => handleAction(onAuditLog)}
              className="block w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 text-sm"
            >
              Audit Log
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => handleAction(onDelete)}
              className="block w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 text-sm"
            >
              Delete
            </button>
          )} 
          {onCollect && (
            <button
              onClick={() => handleAction(onCollect)}
              className="block w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 text-sm"
            >
              Collect
            </button>
          )} 
           {onAck && (
            <button
              onClick={() => handleAction(onAck)}
              className="block w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 text-sm"
            >
              Acknowledge
            </button>
          )} 
          {onValidate && (
            <button
              onClick={() => handleAction(onValidate)}
              className="block w-full px-3 py-2 text-left hover:bg-blue-50 text-blue-600 text-sm"
            >
              Validate
            </button>
          )} 
          {onReject && (
            <button
              onClick={() => handleAction(onReject)}
              className="block w-full px-3 py-2 text-left hover:bg-red-50 text-red-600 text-sm"
            >
              Reject
            </button>
          )} 
        </div>
      )}
    </div>
  );
}