import React from 'react'

export default function LoadingComponent() {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="spinner border-8 border-t-8 border-gray-200 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  )
}
