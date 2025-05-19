"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../(components)/ProtectedRoute";
import { useUserRole } from "@/hooks/useUserRole";

type UserSetting = {
    label: string;
    value: string | boolean;
    type: "text" | "toggle";
};

const mockSettings: UserSetting[] = [
    { label: "Username", value: "john_doe", type: "text" },
    { label: "Email", value: "john.doe@example.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
];

const Settings = () => {
    const [userSettings, setUserSettings] = useState<UserSetting[]>(mockSettings);
    const router = useRouter();
    const roleId = useUserRole();

    const handleToggleChange = (index: number) => {
        const settingsCopy = [...userSettings];
        settingsCopy[index].value = !settingsCopy[index].value as boolean;
        setUserSettings(settingsCopy);
    };

    return (
        <ProtectedRoute>
            <div className="w-full">
                <Header name="User Settings" />
                <div className="overflow-x-auto mt-5 shadow-md">
                    <table className="min-w-full bg-white rounded-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Setting
                                </th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {userSettings.map((setting, index) => (
                                <tr className="hover:bg-purple-50" key={setting.label}>
                                    <td className="py-2 px-4">{setting.label}</td>
                                    <td className="py-2 px-4">
                                        {setting.type === "toggle" ? (
                                            <label className="inline-flex relative items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={setting.value as boolean}
                                                    onChange={() => handleToggleChange(index)}
                                                />
                                                <div
                                                    className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-purple-400 peer-focus:ring-4 
                                                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                                                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                                                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                                                        peer-checked:bg-purple-600"
                                                >
                                                </div>
                                            </label>
                                        ) : (
                                            <input
                                                type="text"
                                                className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-purple-500"
                                                value={setting.value as string}
                                                onChange={(e) => {
                                                    const settingsCopy = [...userSettings];
                                                    settingsCopy[index].value = e.target.value;
                                                    setUserSettings(settingsCopy);
                                                }}
                                            />
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {roleId === 1 && (
                <>
                    <br />
                    <div className="flex justify-between items-center mb-6">
                        <Header name="Admin Settings" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* User Card */}
                        <div className="border border-blue-500 shadow rounded-md p-4 bg-white">
                            <div className="flex flex-col space-y-2">
                                <h3 className="text-lg font-semibold text-gray-800 text-center">User Control Panel</h3>
                                <p className="text-sm text-gray-600 text-center">View Users and manage Users.</p>
                                <button
                                    className="mt-4 bg-purple-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                >
                                    Add User Soon...
                                </button>
                                <button
                                    className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                    onClick={() => router.push('/users')}
                                >
                                    Go Users Control Panel
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </ProtectedRoute>
    );
};

export default Settings;