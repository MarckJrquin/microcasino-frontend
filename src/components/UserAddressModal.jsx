import React, { useEffect, useState } from 'react';

import CountryStateCityService from '../services/countryStateCity.service';
import AddressService from '../services/address.service';

import { toast } from 'sonner';
import { Button, Input, Autocomplete, AutocompleteItem, Avatar, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, user } from '@nextui-org/react';


const UserAddressModal = ( props ) => {

  const { userData, address, open, onClose, refreshAddresses } = props;

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(address?.country || "");
  const [selectedState, setSelectedState] = useState(address?.state || "");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [formValues, setFormValues] = useState({
    country: address?.country || "",
    state: address?.state || "",
    address1: address?.address1 || "",
    address2: address?.address2 || "",
    floorApartmentHouseNumber: address?.floorApartmentHouseNumber || "",
    reference: address?.reference || "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await CountryStateCityService.getCountries();
        setCountries(data);
      } catch (error) {
        toast.error(error.message || 'Error al cargar los países');
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountry) {
        try {
          setStates([]);
          const data = await CountryStateCityService.getStates(selectedCountry);      
          setStates(data);
          setCities([]); // Reset cities when country changes
        } catch (error) {
          toast.error(error.message || 'Error al cargar los estados');
        }
      }
    };

    fetchStates();
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCities = async () => {
      if (selectedCountry && selectedState) {
        try {
          const data = await CountryStateCityService.getCities(selectedCountry, selectedState);
          setCities(data);
        } catch (error) {
          toast.error(error.message || 'Error al cargar las ciudades');
        }
      }
    };

    fetchCities();
  }, [selectedCountry, selectedState]);

  const handleCountryFlag = (countryCode) => {
    return `https://flagcdn.com/${countryCode.toLowerCase()}.svg`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsButtonDisabled(true);

    setTimeout(() => {
        setIsButtonDisabled(false);
    }, 1000);

    try {
      if (address?.id) {
        try {
          await AddressService.updateUserAddress(userData.userId, address.id, formValues);
          toast.success('Dirección actualizada exitosamente');
          (formValues);
          setTimeout(() => {
            onClose();
            refreshAddresses();
          }, 1000);
        } catch (error) {
          toast.error('Error al actualizar la dirección');
        }
      } else {
        try {
          await AddressService.createUserAddress(userData.userId, formValues);
          toast.success('Dirección actualizada exitosamente');
          (formValues);
          refreshAddresses();
          setTimeout(() => {
            onClose();
            refreshAddresses();
          }, 1000);
        } catch (error) {
          toast.error(error.message || 'Error al crear la dirección');
        }
      }
    } catch (error) {
      toast.error(error.message || 'Error al guardar la dirección');
    }
  };

  return (
    <>
      <Modal 
      isOpen={open} 
      onClose={onClose}
      size='xl'
      placement='auto'
      scrollBehavior='inside'
      backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {address?.id ? 'Editar Dirección' : 'Agregar Dirección'}
              </ModalHeader>
              <ModalBody>
                <form id='address-form' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 m-3 md:m-5 md:grid-cols-2">
                  <Autocomplete
                  size='lg'
                  label="País"
                  labelPlacement='outside'
                  placeholder="Seleccionar país"
                  selectedKey={selectedCountry}
                  onSelectionChange={(key) => {
                    setSelectedCountry(key);
                    setFormValues({ ...formValues, country: key });
                  }}
                  isRequired={address?.id ? false : true}
                  >
                    {countries.map((country) => (
                      <AutocompleteItem 
                      key={country.iso2} 
                      value={country.iso2}
                      startContent={<Avatar alt="Argentina" className="w-6 h-6" src={handleCountryFlag(country.iso2)} />}
                      >
                        {country.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Autocomplete 
                  size='lg'
                  label="Provincia"
                  labelPlacement='outside' 
                  placeholder='Seleccionar Provincia'
                  selectedKey={selectedState}
                  onSelectionChange={(key) => {
                    setSelectedState(key);
                    setFormValues({ ...formValues, state: key });
                  }}
                  isDisabled={!selectedCountry}
                  isRequired={address?.id ? false : true}
                  >
                    {states.map((state) => (
                      <AutocompleteItem 
                      key={state.iso2} 
                      value={state.iso2}
                      >
                        {state.name}
                      </AutocompleteItem>
                    ))}
                  </Autocomplete>

                  <Input 
                  size="lg" 
                  type="text" 
                  label="Dirección 1" 
                  labelPlacement="outside" 
                  placeholder="direccion 1" 
                  name="address1" 
                  value={formValues.address1} 
                  onChange={handleChange}
                  isRequired={address?.id ? false : true}
                  />

                  <Input 
                  size="lg" 
                  type="text" 
                  label="Dirección 2" 
                  labelPlacement="outside" 
                  placeholder="direccion 2" 
                  name="address2" 
                  value={formValues.address2} 
                  onChange={handleChange}
                  isRequired={address?.id ? false : true}
                  />

                  <Input 
                  size="lg" 
                  type="text" 
                  label="Nro. de piso/apto/casa" 
                  labelPlacement="outside" 
                  placeholder="Nro. de piso/apto/casa" 
                  name="floorApartmentHouseNumber" 
                  value={formValues.floorApartmentHouseNumber} 
                  onChange={handleChange}
                  isRequired={address?.id ? false : true}
                  />

                  <Input 
                  size="lg" 
                  type="text" 
                  label="Referencia" 
                  labelPlacement="outside" 
                  placeholder="referencia" 
                  name="reference" 
                  value={formValues.reference} 
                  onChange={handleChange}
                  isRequired={address?.id ? false : true}
                  />
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancelar
                </Button>
                <Button form='address-form' color="primary" type='submit' isDisabled={isButtonDisabled}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UserAddressModal;
