import styles from "./ChatView.module.css";
import { useDispatch, useSelector } from "react-redux";
import Chat from "../../components/Chat/Chat.jsx";
import PanelTemplate from "../../components/PanelTemplate/PanelTemplate.jsx";
const company = {
  email: "coolmail@mail.com",
  phone: "341-59-15",
  website: "www.domain.com",
  address:
    "Pasaje Barcelona núm. 8, (08130), Santa Perpetua De Mogoda, Barcelona, Cataluña",
  cnae: "1234",
};

export default function ChatView() {
  const { user, updatingUserLoading } = useSelector((state) => state.user);
  console.log(`usuario: ${user}`);

  return (
    <PanelTemplate>
      <Chat />
    </PanelTemplate>
  );
}
