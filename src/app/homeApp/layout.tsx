import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faMap,
  faCompass
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SubFolderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}

      {/* شريط التنقل السفلي */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 flex justify-around border-t">
        <div className="flex  items-center text-center">
          <Link href="/homeApp/profile">
            <FontAwesomeIcon
              icon={faUser}
              className="text-blue-500 hover:text-blue-500 text-xl "
            /> 
            <span className="block text-gray-500 text-sm ">profile</span>
          </Link>
        </div>
        <div className="flex items-center text-center">
          <Link href="/homeApp/favorites">
            <FontAwesomeIcon
              icon={faHeart}
              className="text-red-500 hover:text-grey-500 text-xl"
            />
            <span className="block text-gray-500 text-sm">favourite</span>
          </Link>
        </div>
        <div className="flex items-center text-center">
          <Link href="/homeApp/map">
            <FontAwesomeIcon
              icon={faMap}
              className="text-green-500 hover:text-green-500 text-xl"
            />
            <span className="block text-gray-500 text-sm">map</span>
          </Link>
        </div>
        <div className="flex items-center text-center">
          <Link href="/homeApp">
            <FontAwesomeIcon
              icon={faCompass}
              className="text-purple-500 hover:text-purple-500 text-xl"
            />
            <span className="block text-gray-500 text-sm">discover</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
