import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from "sweetalert2";

const AIMessage = ({ prompt, text, className }) => {
  const handlePrompt = async () => {
    try {
      // Show loading popup while the AI is generating insights
      const loadingPopup = Swal.fire({
        title: "Generating...",
        text: "Please wait.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
        customClass: {
          popup:
            "!outline !outline-4 !outline-slate-300 !bg-gray-900 !text-white !outline-slate-700",
        },
      });

      // Assuming the API key is stored securely in an environment variable
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      // Generate content asynchronously
      const result = await model.generateContent(prompt);
      const message = result.response.text();

      // Close the loading popup and show the insights message
      await loadingPopup.close();
      await Swal.fire({
        title: "Insights",
        text: message,
        showCloseButton: true,
        customClass: {
          popup:
            "!outline outline-4 !outline-slate-300 !bg-gray-900 !text-white !outline-slate-700",
          confirmButton:
            "!text-white !bg-gradient-to-r !from-blue-500 !via-blue-600 !to-blue-700 !hover:bg-gradient-to-br !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !shadow-lg !shadow-blue-500/50 !font-medium !rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-500",
        },
      });
    } catch (err) {
      console.error(`Something went wrong: ${err}`);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please try again later.",
        customClass: {
          popup:
            "!outline !outline-4 !outline-slate-300 !bg-gray-900 !text-white !outline-slate-700",
          confirmButton:
            "!text-white !bg-gradient-to-r !from-blue-500 !via-blue-600 !to-blue-700 !hover:bg-gradient-to-br !focus:ring-4 !focus:outline-none !focus:ring-blue-300 !shadow-lg !shadow-blue-500/50 !font-medium !rounded-lg text-sm px-5 py-2.5 text-center hover:bg-blue-500",
        },
      });
    }
  };

  return (
    <button
      onClick={handlePrompt}
      className={`flex-1 cursor-pointer text-white bg-gradient-to-r from-blue-500 to-green-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-lg shadow-blue-500/50 font-medium rounded-r-md px-5 py-2.5 text-center ${className}`}
      disabled={prompt === ""}
    >
      {text ? text : "Send"}
    </button>
  );
};

export default AIMessage;
