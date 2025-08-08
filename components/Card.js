export default function Card({ title, text }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
          {title}
        </h2>
      )}
      {text && (
        <p className="text-gray-600 text-center leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
}
