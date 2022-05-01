import axios from 'axios';
//export const BASE_URL = "http://localhost:8080";
export const BASE_URL = "https://instockinventory.com:8080";

export const getWarehouseDetails = (id, setter) => {
    let request = {
        url: '/warehouses/' + id,
        method: 'get',
        baseURL: BASE_URL,
    };

    axios(request)
    .then (response => {
        setter ( {
            warehouseDetails: response.data,
            }
        );
    })
    .catch (error => {
        alert (`Unable to get warehouse details for ${id}.`);
        console.log('getWarehouseDetails error', error);
        setter({
            pageLoadError: true,
        });
    });
}

export const getWarehouses = (setter) => {
    let request = {
        url: '/warehouses/',
        method: 'get',
        baseURL: BASE_URL,
    };

    axios(request)
    .then (response => {
        setter ( {
            warehouses: response.data,
            }
        );
    })
    .catch (error => {
        alert (`Unable to get list of warehouses.`);
        console.log('getWarehouses error', error);
        setter({
            pageLoadError: true,
        });
    });
}

export const getInventory = (setter) => {
    let request = {
        url: '/inventory/',
        method: 'get',
        baseURL: BASE_URL,
    };

    axios(request)
    .then (response => {
        setter ( {
            inventory: response.data,
            }
        );
    })
    .catch (error => {
        alert (`Unable to get list of inventory: ${error}`);
        console.log('getWarehouses error', error);
        setter({
            pageLoadError: true,
        });
    });
}

export const getInventoryDetails = (id, setter) => {
    let request = {
        url: '/inventory/' + id,
        method: 'get',
        baseURL: BASE_URL,
    };

    axios(request)
    .then (response => {
        setter ( {
            inventoryDetails: response.data,
            }
        );
    })
    .catch (error => {
        alert (`Unable to get details for inventory item: ${id}.`);
        console.log('getInventoryDetails error', error);
        setter({
            pageLoadError: true,
        });
    });
}

export const deleteItem = (type, id, turnOff = null) => {
    let url = '';

    switch (type) {
        case 'warehouses':
        case 'warehouse':
            url = '/warehouses/' + id;
            break;
        case 'inventories':
        case 'inventory':
            url = '/inventory/' + id;
            break;
        default:
            alert (`deleteItem: incorrect type ${type}`);
            return false;
    }

    let request = {
        url: url,
        method: 'delete',
        baseURL: BASE_URL,
    };

    axios(request)
    .then (response => {
        if (turnOff) {
            turnOff();
        }
    })
    .catch (error => {
        alert (`Unable to delete ${type} for ${id}.`);
        console.log('deleteItem error', error);
    });
}