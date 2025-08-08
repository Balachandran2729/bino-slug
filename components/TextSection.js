export default function TextSection({ text }) {
  return (
    <div className="m-0 p-4  w-full"> {/* Ensure full width and styling */}
      <p className="text-xl text-gray-800 font-bold">{text}</p> {/* Example text styling */}
    </div>
  );
}