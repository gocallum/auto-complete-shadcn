'use client'

import { useForm, Controller, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CVSchemaType, cvSchema } from '@/model/cv';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import AsyncSelect from 'react-select/async';
import { searchRoles, searchCompanies } from '@/app/actions/cv-actions';

// Define a custom type that extends the default react-select option
interface OptionType {
  label: string;
  value: string;
  isNew?: boolean; // Allow the __isNew__ property
}

export const CVForm: React.FC = () => {
  const methods = useForm<CVSchemaType>({
    resolver: zodResolver(cvSchema),
  });

  const { control, handleSubmit, formState: { errors }, reset } = methods;

  const onSubmit = async (data: CVSchemaType) => {
    console.log('CV Saved', data);
    reset(); // Reset form after submission
  };

  const loadRoles = async (inputValue: string): Promise<OptionType[]> => {
    if (inputValue.length < 1) return [];

    const roles = await searchRoles(inputValue);
    
    const formattedRoles = roles.map((role) => ({ label: role, value: role }));
    
    if (formattedRoles.length === 0) {
        formattedRoles.push({
            label: `Add "${inputValue}"`,
            value: inputValue,
            isNew : true,
        }as OptionType);
    }
    
    return formattedRoles;
  };

  const loadCompanies = async (inputValue: string): Promise<OptionType[]> => {
    if (inputValue.length < 1) return [];

    const companies = await searchCompanies(inputValue);
    
    const formattedCompanies = companies.map((company) => ({ label: company.name, value: company.id }));
    
    if (formattedCompanies.length === 0) {
        formattedCompanies.push({
            label: `Add "${inputValue}"`,
            value: inputValue,
            isNew: true,
        }as OptionType);
    }
    
    return formattedCompanies;
  };

  const addRole = async (newRole: string) => {
    console.log(`Adding new role: ${newRole}`);
    // Add logic to save new role to your database
  };

  const addCompany = async (newCompany: { id: string, name: string }) => {
    console.log(`Adding new company: ${newCompany.name}`);
    // Add logic to save new company to your database
  };

  return (
    <FormProvider {...methods}>
      <Card>
        <CardHeader>
          <CardTitle>Add New CV</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormItem>
              <FormLabel>Name of CV</FormLabel>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input placeholder="CV Name" {...field} />
                )}
              />
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>

            <FormItem>
              <FormLabel>Role</FormLabel>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <AsyncSelect<OptionType>
                    cacheOptions
                    loadOptions={loadRoles}
                    defaultOptions
                    onChange={(selectedOption) => {
                      if (selectedOption?.isNew) {
                        addRole(selectedOption.value);
                        field.onChange(selectedOption.value);
                      } else {
                        field.onChange(selectedOption?.value);
                      }
                    }}
                    placeholder="Select or type role"
                    value={field.value ? { label: field.value, value: field.value } : null}
                    isClearable
                  />
                )}
              />
              {errors.role && <FormMessage>{errors.role.message}</FormMessage>}
            </FormItem>

            <FormItem>
              <FormLabel>Company Applying For</FormLabel>
              <Controller
                name="company"
                control={control}
                render={({ field }) => (
                  <AsyncSelect<OptionType>
                    cacheOptions
                    loadOptions={loadCompanies}
                    defaultOptions
                    onChange={(selectedOption) => {
                      if (selectedOption?.isNew) {
                        const newCompany = { id: selectedOption.value, name: selectedOption.value };
                        addCompany(newCompany);
                        field.onChange(newCompany);
                      } else {
                        field.onChange(selectedOption ? { id: selectedOption.value, name: selectedOption.label } : undefined);
                      }
                    }}
                    placeholder="Select or type company"
                    value={field.value ? { label: field.value.name, value: field.value.id } : null}
                    isClearable
                  />
                )}
              />
              {errors.company && <FormMessage>{errors.company?.name?.message}</FormMessage>}
            </FormItem>

            <Button type="submit">Save CV</Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};
