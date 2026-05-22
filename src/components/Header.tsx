import React, { useState } from "react";
import { Bell, Menu } from "lucide-react";

// import { useAuth } from "./ContextAPI/AuthContext";
import { useLocation } from "react-router-dom";
import NotificationSidebar from "./Notifications/NotificationSideBar";
// import axios from "axios";
 
// Header Component
interface HeaderProps {
  onMobileMenuToggle: () => void;
}
 
interface NotificationCount {
  UnReadCount: number;
  TotalRowCount?: number;
  UserID?: number;
}
 
// const apiUrl = import.meta.env.VITE_API_URL;
 
const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle }) => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notificationCount, _setNotificationCount] =
    useState<NotificationCount | null>(null);
  // const [headerNotification, setHeaderNotification] = useState<any[]>([]);
  // const { userId } = useAuth();
 
  // const username = localStorage.getItem("username");
  // const email = localStorage.getItem("email");
  const location = useLocation();
const [userDetail, _setUserDetail] = useState<any>(null);
 
const username = userDetail?.[0]?.UserName || localStorage.getItem("username");
const email = userDetail?.[0]?.Email || localStorage.getItem("email");
  // ----------------------------
  // FETCH NOTIFICATIONS

//  useEffect(() => {
//    fetchNotifications();
//   }, []);
  // Run only when userId is available (NO infinite loop)

const headerTitleMap: Record<string, string> = {
  // "my-nominations": "My Nomination Details",
  // "other-nominations": "Other Nomination Details",
  "referral-approval": "Referral Approval Details",
  "approvals": "Manager Approval Details",
  "business-jury": "Business Jury Review",
  "president-level": "Grand Jury Review",
  "president-unit": "President Unit Review",
};
  // ----------------------------
  // HEADER TITLE HANDLER
  // ----------------------------
  const getHeaderTitle = () => {
  const from = location.state?.from;
  const tab = location.state?.tab;
 
    if (from === "nominations") {
      return tab === "others"
        ? "Other Nomination Details"
        : "My Nomination Details";
    }
    else if (from && headerTitleMap[from]) {
      return headerTitleMap[from];
    }
 
    switch (location.pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/home":
        return "Home";
      
      // Study Module Routes
      case "/study/master":
        return "Study Master";
      case "/study/amendment":
        return "Study Amendment";
      case "/study/site":
        return "Site Registration";  
      
      // Subject Module Routes
      case "/subject/enrollment":
        return "Subject Enrollment";
      case "/subject/adverse":
        return "Adverse Event Tracking";  
      
      
      case "/visit":
        return "Visit Schedule";
      case "/visit/new-add":
        return "Add New Visit";
      
     
      case "/analyzer":
        return "Analyzer Integration";
      case "/analyzer/new-add":
        return "Add New Analyzer";
      
      
      case "/biobank":
        return "Biobank Management";
      case "/biobank/new-add":
        return "Add New Sample";
      
     
      case "/results":
        return "Results Review";
      case "/results/new-add":
        return "Add New Result";
      
     
      case "/qc":
        return "Final QC Approval";
      case "/qc/new-add":
        return "Add New QC Record";
      
      // Analysis & Test Routes
      case "/Analysis":
        return "Analysis Management";
      case "/testRegistration":
        return "Visit Scheduling";
      case "/sample/reception":
        return "Sample Reception";
         case "/testRegistration":
        return "Test Registration List";
      case "/testRegistration/new-add":
        return "Add New Test";
      
      // Report Routes
      case "/reports/generate":
        return "Generate Report";
      
      // Legacy/Other Routes
      case "/finalQCApproval":
        return "Final QC Approval";
      case "/resultsReview":
        return "Results Review";  
      case "/biobankManagement":    
        return "Biobank Management";
      case "/referral-approval":
      case "/referral-detail":
        return "Referral Approval";
      case "/nomination-detail":
        return "Nomination Details";
      case "/approve-detail":
        return "Manager Approval";
      case "/approvals":
        return "Manager Approval";
      case "/other-nomination":
        return "Other Nomination";
      case "/business-jury":
        return "Business Jury";
      case "/president-unit":
        return "Primary Business Jury";
      case "/president-level":
        return "Grand Jury";
      case "/award-management":
        return "Award Management";
      case "/admin-setting":
        return "Admin Settings";
      case "/my-nominations/add-nomination":
        return "Others Nominate Form";
      case "/my-nominations/:nominationId":
        return "Others Nominate Form";  
      case "/admin-setting/jury-panel-setup":
        return "jury Panel";
      case "/leader-board":
        return "LeaderBoard";

        case "/report":
          return "Category Wise Nomination";
           case "/reports/generate":
          return "Report List";
           case "/testRegistration/new-add":
          return "Test Registration";
          case "/report-form":
          return "Report";

      case "/report":
        return "Category Wise Nomination";

      case "/notifications":
        return "Notifications";
      case "/inventory":
        return "Inventory Management";
      case "/user-form":
        return "User Management";
      default:
        // Check for dynamic routes with parameters
        if (location.pathname.match(/\/my-nominations\/\d+/)) {
          return "Nomination Details";
        }
        if (location.pathname.match(/\/admin-setting\/.+/)) {
          return "Admin Settings";
        }
        return "Nomination Management";
    }
  };
 
  return (
    <div className="bg-white shadow-lg z-1 px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
      {/* Mobile Menu Button */}
      <div className="flex items-center">
        <button
          onClick={onMobileMenuToggle}
          className="lg:hidden mr-4 p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          {getHeaderTitle()}
        </h1>
      </div>
 
      <div className="flex items-center space-x-3 sm:space-x-5">
        {/* Notification Icon */}
        <div className="relative cursor-pointer"          
             onClick={() => setIsNotificationOpen(true)}
>
          <Bell size={20} className="text-gray-600" />
          {notificationCount?.UnReadCount && notificationCount.UnReadCount > 0 && (
            <span className="absolute -top-2 -right-3 w-6 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {notificationCount.UnReadCount > 99 ? "99+" : notificationCount.UnReadCount}
            </span>
          )}
        </div>
 
        {/* Profile Section */}
        <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-lg transition-colors group">
          {/* Avatar */}
          <div
            className="w-9 h-9 sm:w-11 sm:h-11
                       rounded-full flex items-center justify-center
                       text-base sm:text-lg font-semibold text-white
                       shrink-0 themeColor"
          >
            {username ? username.trim().charAt(0).toUpperCase() : "U"}
          </div>
 
          {/* Text */}
          <div className="text-sm hidden sm:block min-w-0 flex-1">
            <div className="font-semibold text-gray-800 truncate">{username || "User"}</div>
            <div className="text-gray-500 text-xs truncate">{email || "user@example.com"}</div>
          </div>
        </div>
      </div>

       <NotificationSidebar
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />
     
    </div>
  );
};
 
export default Header;