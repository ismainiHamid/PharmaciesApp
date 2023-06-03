import React, {useEffect, useMemo, useReducer, useState} from 'react';
import {Button, Col, Form, Input, Modal, Row, Select, Space, Table, Upload} from "antd";
import axios from "axios";


const Pharmacie = axios.create({baseURL: "/api/pharmacie"});

function PharmacieComponent() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [pharmacies, setPharmacies] = useState([]);
    const [zones, setZones] = useState([]);
    const [form] = Form.useForm();

    const columns = [
        {
            title: 'Nom',
            dataIndex: 'nom',
            key: 'nom',
            align: 'center',
        },
        {
            title: 'Adresse',
            dataIndex: 'adresse',
            key: 'adresse',
            align: 'center',
        },
        {
            title: 'Telephone',
            dataIndex: 'telephone',
            key: 'telephone',
            align: 'center',
        },
        {
            title: 'Latitude',
            dataIndex: 'latitude',
            key: 'latitude',
            align: 'center',
        },
        {
            title: 'Longitude',
            dataIndex: 'longitude',
            key: 'longitude',
            align: 'center',
        },
        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'actions',
            align: 'center',
            render: (_, record, index) => (
                <Space size="middle">
                    <Button shape="round" onClick={e => {
                        axios.delete('/api/pharmacies/delete', {data: {id: record.id}})
                            .then(() => {
                                forceUpdate()
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    }} size="small" danger>Delete</Button>

                    <Button shape="round" size="small" warning>Edite</Button>
                </Space>
            ),
        }
    ];

    useEffect(() => {
        axios.get('/api/pharmacies/')
            .then((data) =>
                setPharmacies(data.data))
            .catch(error => console.log(error));
    }, [upTB])

    useEffect(() => {
        axios.get('/api/zones/')
            .then((data) =>
                setZones(data.data))
            .catch(error => console.log(error));
    }, [])

    const options = useMemo(() => zones.map((zone) => (
        {
            value: zone.id,
            label: zone.nom,
        }
    )), [pharmacies]);

    const rows = useMemo(() => pharmacies.map((pharmacie) => (
        {
            id: pharmacie.id,
            nom: pharmacie.nom,
            adresse: pharmacie.adresse,
            telephone: pharmacie.telephone,
            latitude: pharmacie.latitude,
            longitude: pharmacie.longitude
        }
    )), [pharmacies]);

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        axios.post('/api/pharmacies/save', {
                nom: values.nom,
                adresse: values.adresse,
                telephone: values.telephone,
                latitude: values.latitude,
                longitude: values.longitude,
                zone: {id: values.zone}
            }
        )
            .then((data) => {
                console.log(data.data)
                forceUpdate()
                onReset()
                setOpen(false)
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
        form.resetFields();
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div>
            <>
                <Button type="primary"
                        style={{marginBottom: "1rem", border: "none", textTransform: "uppercase", fontWeight: "500"}}
                        onClick={showModal} ghost>
                    Ajouter Nouveaux
                </Button>
                <Modal
                    title="Ajouter Nouveaux Pharmacie"
                    open={open}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form layout="vertical" className="main-form" name="basic" form={form}
                          initialValues={{
                              remember: true
                          }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}>

                        <Form.Item name="nom" rules={[{required: true,}]}>
                            <Input placeholder="Nom de pharmacie"/>
                        </Form.Item>

                        <Form.Item name="adresse" rules={[{required: true,}]}>
                            <Input placeholder="Adresse"/>
                        </Form.Item>

                        <Form.Item name="telephone" rules={[{required: true,}]}>
                            <Input placeholder="Telehpone"/>
                        </Form.Item>

                        <Form.Item name="latitude" rules={[{required: true,}]}>
                            <Input placeholder="Latitude"/>
                        </Form.Item>

                        <Form.Item name="longitude" rules={[{required: true,}]}>
                            <Input placeholder="Longitude"/>
                        </Form.Item>

                        <Form.Item name="zone" rules={[{required: true,}]}>
                            <Select options={options}/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">Ajouter</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>

            <>
                <Table columns={columns} dataSource={rows} pagination={{pageSize: 5, position: 'bottomCenter'}}/>
            </>
        </div>
    );
}

export default PharmacieComponent;