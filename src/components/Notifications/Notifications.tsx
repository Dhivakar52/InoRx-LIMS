// Notifications.jsx
import  { useCallback, useState } from "react";
import {
  Bell,
  Search,
  FlaskConical,
  AlertCircle,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import CustomPanel from "../../common/CustomPanel";


const notificationData = [
  {
    id: 1,
    title: "Blood Sample Collection Completed",
    message:
      "Patient ID #LAB1021 blood sample has been collected successfully for CBC test.",
    time: "2 mins ago",
    type: "success",
    unread: true,
  },
  {
    id: 2,
    title: "Critical Glucose Level Alert",
    message:
      "Patient ID #LAB2098 glucose levels are critically high. Immediate review required.",
    time: "10 mins ago",
    type: "alert",
    unread: true,
  },
  {
    id: 3,
    title: "Urine Sample Pending",
    message:
      "Urine sample collection for Patient ID #LAB4501 is still pending.",
    time: "18 mins ago",
    type: "pending",
    unread: true,
  },
  {
    id: 4,
    title: "COVID-19 Test Result Ready",
    message:
      "RT-PCR test results for Patient ID #LAB5542 are now available.",
    time: "30 mins ago",
    type: "success",
    unread: false,
  },
  {
    id: 5,
    title: "Sample Rejected",
    message:
      "Blood sample for Patient ID #LAB7721 has been rejected due to clotting.",
    time: "45 mins ago",
    type: "alert",
    unread: false,
  },
  {
    id: 6,
    title: "Pathology Report Uploaded",
    message:
      "Histopathology report for biopsy sample #BIO2201 has been uploaded.",
    time: "1 hour ago",
    type: "success",
    unread: false,
  },
  {
    id: 7,
    title: "Lab Equipment Maintenance",
    message:
      "Hematology analyzer maintenance is scheduled today at 6 PM.",
    time: "2 hours ago",
    type: "pending",
    unread: false,
  },
  {
    id: 8,
    title: "Lipid Profile Test Delayed",
    message:
      "Processing of lipid profile samples is delayed due to calibration.",
    time: "3 hours ago",
    type: "alert",
    unread: true,
  },
  {
    id: 9,
    title: "New Sample Received",
    message:
      "A new blood culture sample has been received in Microbiology Lab.",
    time: "4 hours ago",
    type: "success",
    unread: false,
  },
  {
    id: 10,
    title: "Biochemistry Report Approved",
    message:
      "Biochemistry report for Patient ID #LAB9011 has been approved by Dr. Smith.",
    time: "5 hours ago",
    type: "success",
    unread: false,
  },
  {
    id: 11,
    title: "Sample Transport Delayed",
    message:
      "Transport delay reported for external diagnostic samples.",
    time: "6 hours ago",
    type: "pending",
    unread: false,
  },
  {
    id: 12,
    title: "Abnormal Thyroid Levels Detected",
    message:
      "TSH levels for Patient ID #LAB1120 are outside normal range.",
    time: "7 hours ago",
    type: "alert",
    unread: true,
  },
  {
    id: 13,
    title: "MRI Scan Report Ready",
    message:
      "MRI scan report for Patient ID #RAD2234 is now ready for review.",
    time: "8 hours ago",
    type: "success",
    unread: false,
  },
  {
    id: 14,
    title: "Pending Pathology Approval",
    message:
      "Pathology report for sample #PAT901 requires final approval.",
    time: "9 hours ago",
    type: "pending",
    unread: false,
  },
  {
    id: 15,
    title: "Low Hemoglobin Alert",
    message:
      "Patient ID #LAB3412 hemoglobin value is critically low.",
    time: "10 hours ago",
    type: "alert",
    unread: true,
  },
  {
    id: 16,
    title: "X-Ray Report Uploaded",
    message:
      "Chest X-Ray report for Patient ID #RAD8821 has been uploaded.",
    time: "12 hours ago",
    type: "success",
    unread: false,
  },
  {
    id: 17,
    title: "Sample Storage Temperature Warning",
    message:
      "Cold storage temperature exceeded threshold in Lab Unit B.",
    time: "14 hours ago",
    type: "alert",
    unread: true,
  },
  {
    id: 18,
    title: "New Pathology Request",
    message:
      "A new pathology request has been created for Patient ID #LAB7891.",
    time: "16 hours ago",
    type: "pending",
    unread: false,
  },
  {
    id: 19,
    title: "Lab Technician Assigned",
    message:
      "Technician John Doe assigned to sample batch #BATCH220.",
    time: "18 hours ago",
    type: "success",
    unread: false,
  },
  {
    id: 20,
    title: "Critical Potassium Level",
    message:
      "Patient ID #LAB9921 potassium level requires urgent medical attention.",
    time: "1 day ago",
    type: "alert",
    unread: true,
  },
];

const getIcon = (type:any) => {
  switch (type) {
    case "success":
      return <CheckCircle2 size={22} className="text-green-600" />;
    case "alert":
      return <AlertCircle size={22} className="text-red-500" />;
    case "pending":
      return <Clock3 size={22} className="text-yellow-500" />;
    default:
      return <FlaskConical size={22} className="text-blue-500" />;
  }
};

const Notifications = () => {
  const [search, setSearch] = useState("");

  const filteredNotifications = notificationData.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.message.toLowerCase().includes(search.toLowerCase())
  );

  type PanelMode = "view" | null;
    const [panelMode, setPanelMode] = useState<PanelMode>(null);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleNotificationClick = (notification: any) => {
        setSelectedItem(notification);
        setPanelMode("view");
    };

     const handleClosePanel = useCallback(() => {
        setPanelMode(null);
        setSelectedItem(null);
      }, []);
    

  return (
    <div className="min-h-screen ">
        <div className="mx-3 p-6 bg-white rounded-lg shadow-sm my-3">

           {/* Header */}
          <div className="mb-6 flex justify-between item-center">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-6 h-6 text-gray-700" />
              <h1 className="text-2xl font-semibold text-gray-900">All Notifications</h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-75">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
              onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`bg-[#F0F5FF] rounded-lg p-4 cursor-pointer hover:bg-[#E5EDFF] transition-all duration-200 border border-gray-200 shadow-sm hover:shadow-md`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className="mt-1">
                  {getIcon(notification.type)}
                </div>

                <div>
                  <h2 className="text-mg font-semibold text-gray-800">
                    {notification.title}
                  </h2>

                  <p className="text-gray-600 mt-1 leading-relaxed">
                    {notification.message}
                  </p>
                </div>
              </div>

              <span className="text-sm text-gray-500 whitespace-nowrap">
                {notification.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <CustomPanel isOpen={panelMode === "view"} title="Notification Details" onClose={handleClosePanel} onSave={handleClosePanel} saveLabel="Close">
            {selectedItem && (
              <div className="space-y-4">
                <div className="border-b pb-3">
                  <label className="block text-sm font-medium text-gray-600">Title</label>
                  <p className="mt-1 text-gray-900 font-semibold">{selectedItem.title}</p>
                </div>
                <div className="border-b pb-3">
                  <label className="block text-sm font-medium text-gray-600">Message</label>
                  <p className="mt-2 text-gray-700 leading-relaxed">{selectedItem.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border-b pb-3">
                    <label className="block text-sm font-medium text-gray-600">Type</label>
                    <p className="mt-1 text-gray-900 capitalize">
                      <span className="inline-flex items-center gap-2">
                        {getIcon(selectedItem.type)}
                        {selectedItem.type}
                      </span>
                    </p>
                  </div>
                  <div className="border-b pb-3">
                    <label className="block text-sm font-medium text-gray-600">Time</label>
                    <p className="mt-1 text-gray-900">{selectedItem.time}</p>
                  </div>
                </div>
                <div className="border-b pb-3">
                  <label className="block text-sm font-medium text-gray-600">Status</label>
                  <p className="mt-1 text-gray-900">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedItem.unread ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'}`}>
                      {selectedItem.unread ? 'Unread' : 'Read'}
                    </span>
                  </p>
                </div>
              </div>
            )}
          </CustomPanel>
    </div>
  );
};

export default Notifications;