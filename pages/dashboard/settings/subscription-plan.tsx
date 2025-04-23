import React from 'react';
import DashboardLayout from '../DashboardLayout';
import GradientBorder from '../../../components/HomeGradientBorder';


const SubscriptionPlan: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-md text-gray-800">
        {/* Current Plan */}
        <div className="mb-8">
          <h2 className="text-lg font-bold">Current Plan</h2>
          <div className="mt-2 p-4 border rounded-lg bg-gray-100">
          <GradientBorder>
            <p className="text-md text-white px-2">FREE PLAN</p>
            </GradientBorder>
            <p className="text-gray-600 font-bold">$0 per month</p>
          </div>
          <button disabled className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Upgrade
          </button>
        </div>

        
        {/* <div className="mb-8">
          <h2 className="text-lg font-semibold">Account</h2>
          <p className="mt-2 text-gray-700  p-4 border rounded-lg bg-gray-100">olayiwolajesutofunmi@gmail.com</p>

          <button className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition">
            Set Password
          </button>
        </div> */}

        {/* Danger Zone */}
        <div className="border-t pt-6">
          <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
          <p className="text-gray-700 mt-2">
            Deleting your account permanently deletes your page and all your data.
          </p>

          <button disabled className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">
            Delete Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubscriptionPlan;
