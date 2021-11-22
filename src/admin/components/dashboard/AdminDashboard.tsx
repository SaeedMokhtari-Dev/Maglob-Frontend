import React, {useEffect} from 'react';
import {inject, observer} from "mobx-react";
import Stores from "app/constants/Stores";
import {Col, Descriptions, Divider, Row, Spin, Table} from "antd";
import AdminStore from 'admin/stores/AdminStore';

interface DashboardProps {
    adminStore?: AdminStore
}

const AdminDashboard: React.FC<DashboardProps> = inject(Stores.adminStore)(observer(({adminStore}) =>
{
    const [dataFetched, setDataFetched] = React.useState(false);

    useEffect(() => {
        onLoad();

        return onUnload;
    }, []);

    async function onLoad() {
        adminStore.onAdminGetPageLoad();
        await adminStore.getAdminViewModel.getDashboardData();
        setDataFetched(true);
    }

    let viewModel = adminStore.getAdminViewModel;

    if (!viewModel) return;

    function onUnload() {
        adminStore.onAdminGetPageUnload();
    }

    return (
        <div>
        {dataFetched ?
            <div>
            </div>
                :
                <Row gutter={[24, 16]}>
                    <Col offset={11} span={8}>
                        <Spin className={"spine"} size="large" />
                    </Col>
                </Row>
        }
        </div>
    )
}));

export default AdminDashboard;
