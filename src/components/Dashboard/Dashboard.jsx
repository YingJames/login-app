import { useContext } from "react";
import { CurrentUserContext } from "../../App";
import { Content, Theme} from "@carbon/react";
import Navbar from "../organisms/Navbar";
import './_dashboard.scss'

const Dashboard = () => {
    const { user } = useContext(CurrentUserContext);

    return (
        <>

            <Theme theme={'g90'}>
                <Navbar />
            </Theme>


            <Content className=".cds--content">
                <h1>Dashboard, Hi {user.displayName}!</h1>
            </Content>

        </>
    );
};

export default Dashboard;