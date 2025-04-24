import React, { useState } from 'react';
import DashboardLayout from '../DashboardLayout';
import GradientBorder from '../../../components/HomeGradientBorder';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';

const SubscriptionPlan: React.FC = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  const handleDeleteAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://prettybioo.up.railway.app/account', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.ok) {
        localStorage.removeItem('accessToken');
        toast.success('Account deleted. Goodbye!');
        setTimeout(() => {
          window.location.href = '/authentication/Login';
        }, 2000);
      } else {
        toast.error('Failed to delete account. Please try again.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred. Try again later.');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
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
            <button
              disabled
              className="mt-4 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Upgrade
            </button>
          </div>

          {/* Danger Zone */}
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold text-red-500">Danger Zone</h2>
            <p className="text-gray-700 mt-2">
              Deleting your account permanently deletes your page and all your data.
            </p>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Delete Account
            </button>
          </div>
        </div>

      
        <AnimatePresence>
          {showDeleteModal && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white p-6 rounded-lg max-w-[300px] w-96 shadow-lg text-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <h3 className="text-lg font-bold text-red-600">Confirm Deletion</h3>
                <p className="text-gray-700 mt-2">
                  Are you sure you want to delete your account?
                </p>
                <div className="mt-4 flex justify-between gap-4">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    disabled={loading}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
};

export default SubscriptionPlan;

