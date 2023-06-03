import './App.css';
import {Col, Menu, Row} from "antd";
import {LinkOutlined} from "@mui/icons-material";
import {Menubar} from 'primereact/menubar';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PharmacieComponent from "./components/admin/PharmacieComponent";
import VilleComponent from "./components/admin/VilleComponent";
import PharmacieGardeComponent from "./components/admin/PharmacieGardeComponent";
import GardeComponent from "./components/admin/GardeComponent";
import ZoneComponent from "./components/admin/ZoneComponent";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem(
        <a href="/pharmacies">
            Pharmacies
        </a>,
        'link',
        <LinkOutlined/>,
    ),

    getItem(
        <a href="/pharmaciesGarde">
            Pharmacies de garde
        </a>,
        'link',
        <LinkOutlined/>,
    ),

    getItem(
        <a href="/gardes">
            Gardes
        </a>,
        'link',
        <LinkOutlined/>,
    ),

    getItem(
        <a href="/zones">
            Zones
        </a>,
        'link',
        <LinkOutlined/>,
    ),

    getItem(
        <a href="/villes">
            Villes
        </a>,
        'link',
        <LinkOutlined/>,
    ),
];
const onClick = (e) => {
    console.log('click', e);
};

function App() {
    return (
        <Container>
        </Container>
        <Row>
            <Col span={4}>
                <Menu onClick={onClick}
                      style={{width: "100%", height: "100%", padding: "2rem 1rem", backgroundColor: "#063970"}}
                      mode="vertical"
                      items={items}/>
            </Col>
            <Col span={20}>
                <Row>
                    <Col span={24}>
                        <Menubar/>
                    </Col>

                    <Col span={24} style={{padding: "2rem 5rem"}}>
                        <BrowserRouter>
                            <Routes>
                                <Route path="pharmacies" element={<PharmacieComponent/>}/>
                                <Route path="pharmaciesGarde" element={<PharmacieGardeComponent/>}/>
                                <Route path="gardes" element={<GardeComponent/>}/>
                                <Route path="zones" element={<ZoneComponent/>}/>
                                <Route path="villes" element={<VilleComponent/>}/>
                            </Routes>
                        </BrowserRouter>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default App;
