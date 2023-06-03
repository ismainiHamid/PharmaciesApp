import React, {Component, useEffect, useMemo, useReducer, useState} from 'react';
import {Button, DatePicker, Form, Input, Modal, Select, Space, Table} from "antd";
import axios from "axios";
import dayjs from "dayjs";

function PharmacieGardeComponent() {
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [upTB, forceUpdate] = useReducer((x) => x + 1, 0);
    const [pharmacies, setPharmacies] = useState([]);
    const [gardes, setGardes] = useState([]);
    const [pharmacieGardes, setPharmacieGardes] = useState([]);
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
                        axios.delete('/api/pharmacieGarde/delete', {data: {id: record.id}})
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
        axios.get('/api/pharmacieGarde/')
            .then((data) =>
                setPharmacieGardes(data.data))
            .catch(error => console.log(error));
    }, [upTB])

    useEffect(() => {
        axios.get('/api/pharmacies/')
            .then((data) =>
                setPharmacies(data.data))
            .catch(error => console.log(error));
    }, [])

    useEffect(() => {
        axios.get('/api/gardes/')
            .then((data) =>
                setGardes(data.data))
            .catch(error => console.log(error));
    }, [])

    const optionsPharmacie = useMemo(() => pharmacies.map((pharmacie) => (
        {
            value: pharmacie.id,
            label: pharmacie.nom,
        }
    )), [pharmacies]);


    const optionsGarde = useMemo(() => gardes.map((garde) => (
        {
            value: garde.id,
            label: garde.type,
        }
    )), [gardes]);

    const rows = useMemo(() => pharmacieGardes.map((pharmacie) => (
        {
            id: pharmacie.nom,
            nom: pharmacie.nom,
            adresse: pharmacie.adresse,
            telephone: pharmacie.telephone,
            latitude: pharmacie.latitude,
        }
    )), [pharmacieGardes]);

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = (values) => {
        axios.post('/api/pharmacieGarde/save', {
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
                    title="Ajouter Pharmacie de garde"
                    open={open}
                    confirmLoading={confirmLoading}
                    onCancel={handleCancel}
                >
                    <Form layout="vertical" className="main-form-sx" name="basic" form={form}
                          initialValues={{
                              remember: true
                          }}
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}>
                        <Form.Item name="pharmacie" rules={[{required: true,}]}>
                            <Select options={optionsPharmacie}/>
                        </Form.Item>

                        <Form.Item name="garde" rules={[{required: true,}]}>
                            <Select options={optionsGarde}/>
                        </Form.Item>

                        <Form.Item name="latitude" rules={[{required: true,}]}>
                            <DatePicker defaultValue={dayjs('2015/01/01')} />
                        </Form.Item>

                        <Form.Item name="longitude" rules={[{required: true,}]}>
                            <DatePicker defaultValue={dayjs('2015/01/01')} />

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

export default PharmacieGardeComponent;