import AddEventModal from "../components/AddEventModal";
async function CreateEvent() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-amber-500">
      <AddEventModal />
    </div>
  );
}

export default CreateEvent;
