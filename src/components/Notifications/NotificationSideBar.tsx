import {
  Bell,
  X,
  FileText,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as Dialog from '@radix-ui/react-dialog';
import { useRef } from "react";

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const notifications = [
  {
    id: 1,
    title: "Blood Sample Collection Completed",
    from: "Central Lab",
    time: "2 mins ago",
  },
  {
    id: 2,
    title: "Critical Glucose Level Alert",
    from: "Biochemistry Dept",
    time: "10 mins ago",
  },
  {
    id: 3,
    title: "Urine Sample Pending",
    from: "Microbiology Lab",
    time: "18 mins ago",
  },
  {
    id: 4,
    title: "COVID-19 Test Result Ready",
    from: "Virology Unit",
    time: "30 mins ago",
  },
  {
    id: 5,
    title: "Sample Rejected Due To Clotting",
    from: "Pathology Dept",
    time: "45 mins ago",
  },
  {
    id: 6,
    title: "Histopathology Report Uploaded",
    from: "Dr. Anderson",
    time: "1 hour ago",
  },
  {
    id: 7,
    title: "MRI Scan Report Ready",
    from: "Radiology Department",
    time: "2 hours ago",
  },
  {
    id: 8,
    title: "Low Hemoglobin Alert",
    from: "Hematology Lab",
    time: "3 hours ago",
  },
];

const NotificationSidebar : React.FC<NotificationModalProps>= ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  const handleViewAll = () => {
    onClose();  
    navigate("/notifications");
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" />

       <Dialog.Content className="fixed top-0 right-0 h-full  w-[30%] bg-white shadow-2xl border-l border-gray-200 overflow-y-auto z-50">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white sticky top-0 z-10">
            <div className="flex items-center space-x-4">
              <Bell className="w-5 h-5 text-gray-600" />
              <Dialog.Title className="text-lg font-semibold text-gray-900">
                Notifications 
              </Dialog.Title>
              {notifications.length > 0 && (
                <button
                  type="button"
                  className=" text-sm font-medium text-blue-600 hover:underline "
                >
                  Mark all as read
                </button>
              )}
            </div>

            <Dialog.Close ref={closeBtnRef} className="border-0 bg-transparent p-1 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-0 shadow-none appearance-none outline-none">
              <X size={20} className="text-gray-500" />
            </Dialog.Close>
          </div>

      {/* Notification List */}
      <div className="flex flex-col pb-16">

        {notifications.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 px-6 py-6 border-b border-slate-200 bg-[#EEF4FF] hover:bg-[#E3ECFF] transition-all duration-200"
          >

            {/* Icon */}
            <div className="w-[42px] h-[42px] rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <FileText
                size={20}
                className="text-blue-600"
              />
            </div>

            {/* Content */}
        
             <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className={`text-sm mb-1 font-bold text-gray-900`}>
                          {item.title}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2 whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                        <p className="text-xs text-gray-400 mt-1">From: {item.from}</p>
              </div>
          </div>
        ))}

      </div>

        <div className="sticky bottom-0 w-full px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="text-center">
              <button type="button" onClick={handleViewAll} className="border-0 bg-transparent text-sm font-medium text-blue-600 hover:underline focus:outline-none focus:ring-0 shadow-none appearance-none outline-none p-0">
                View All
              </button>
            </div>
          </div>


         </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>   
  );
};

export default NotificationSidebar;