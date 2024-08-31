import React from "react";

const EmailCircles = ({
  emails,
  maxDisplay = 5,
}: {
  emails: string[];
  maxDisplay?: number;
}) => {
  return (
    <div className="flex items-center">
      {emails.slice(0, maxDisplay).map((email, index) => (
        <div
          key={index}
          className={`relative flex justify-center items-center w-10 h-10 bg-blue-500 text-white rounded-full cursor-pointer hover:z-10 hover:scale-110 transition transform ${
            index !== 0 ? "-ml-4" : ""
          }`}
          title={email}
        >
          {email.charAt(0).toUpperCase()}
        </div>
      ))}
      {emails.length > maxDisplay && (
        <div
          className="relative flex justify-center items-center w-10 h-10 bg-gray-500 text-white rounded-full cursor-pointer -ml-4 hover:z-10 hover:scale-110 transition transform"
          title={`${emails.length - maxDisplay} more`}
        >
          +{emails.length - maxDisplay}
        </div>
      )}
    </div>
  );
};

export default EmailCircles;
