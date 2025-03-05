"use client"

import React, { useState } from "react"
import { useFieldArray, useForm, Controller } from "react-hook-form"
import styled from "styled-components"
import { ChevronRight, ChevronDown, Plus, Minus, Trash2 } from "lucide-react"

// Types
interface FieldItem {
  displayName: string
  fieldType: string
  expanded?: boolean
  children?: FieldItem[]
}

interface FormValues {
  fields: (FieldItem & {
    children?: (FieldItem & {
      displayName: string
      fieldType: string
    })[]
  })[]
}

// Styled Components
const Container = styled.div`
  background-color: #1c1c1e;
  color: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  max-width: 800px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

const Header = styled.h1`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 24px;
`

const FieldRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

// Update the NestedFieldContainer to improve alignment
const NestedFieldContainer = styled.div`
  margin-left: 24px;
  border-left: 1px solid #3a3a3c;
  padding-left: 24px;
  padding-top: 8px;
`

const FieldLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  margin-bottom: 8px;
`

const InfoIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 1px solid #6e6e73;
  font-size: 12px;
  cursor: help;
`

const InputField = styled.input`
  background-color: #2c2c2e;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  width: 100%;
  &::placeholder {
    color: #8e8e93;
  }
`

const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`

const SelectField = styled.div<{ isOpen?: boolean }>`
  background-color: #2c2c2e;
  border: none;
  border-radius: 8px;
  color: white;
  padding: 12px 16px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  border-bottom-left-radius: ${(props) => (props.isOpen ? "0" : "8px")};
  border-bottom-right-radius: ${(props) => (props.isOpen ? "0" : "8px")};
`

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #2c2c2e;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;
  &:hover {
    background-color: #3a3a3c;
  }
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`

const CancelButton = styled.button`
  background-color: #3a3a3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #48484a;
  }
`

const DoneButton = styled.button`
  background-color: #5e5ce6;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #6b69d6;
  }
`

const IconButton = styled.button<{ variant?: "add" | "remove" | "delete" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  background-color: ${(props) =>
    props.variant === "add"
      ? "#1c64f2"
      : props.variant === "remove"
        ? "#8b5cf6"
        : props.variant === "delete"
          ? "#7f1d1d"
          : "#3a3a3c"};
  color: white;
  transition: opacity 0.2s;
  &:hover {
    opacity: 0.8;
  }
`

const ExpandButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

// Update the FieldGroup styled component to fix alignment
const FieldGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr auto auto;
  gap: 12px;
  width: 100%;
  align-items: flex-end;
`

// Field type options
const fieldTypeOptions = ["JSON", "String", "Number", "Boolean", "Array", "Object", "Date"]

// Custom Select Component
const Select = ({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <SelectWrapper>
      <SelectField isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {value} <ChevronDown size={16} />
      </SelectField>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownItem
              key={option}
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
            >
              {option}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </SelectWrapper>
  )
}

// Main Component
export default function JsonFieldEditor() {
  const { control, handleSubmit, register, setValue, getValues } = useForm<FormValues>({
    defaultValues: {
      fields: [
        {
          displayName: "",
          fieldType: "JSON",
          expanded: false,
          children: [
            { displayName: "", fieldType: "JSON" },
            { displayName: "", fieldType: "JSON" },
          ],
        },
        {
          displayName: "",
          fieldType: "JSON",
          expanded: false,
          children: [{ displayName: "", fieldType: "JSON" }],
        },
      ],
    },
  })

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "fields",
  })

  const [expandedFields, setExpandedFields] = useState<Record<number, boolean>>({
    0: true,
    1: false,
  })

  const toggleExpand = (index: number) => {
    setExpandedFields((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  // Replace the addChildField, removeChildField functions and add deleteField function
  const addChildField = (parentIndex: number) => {
    const currentFields = getValues().fields
    const currentParent = currentFields[parentIndex]

    const updatedChildren = [...(currentParent.children || []), { displayName: "", fieldType: "JSON" }]

    update(parentIndex, {
      ...currentParent,
      children: updatedChildren,
    })
  }

  const removeChildField = (parentIndex: number, childIndex: number) => {
    const currentFields = getValues().fields
    const currentParent = currentFields[parentIndex]

    if (!currentParent.children || currentParent.children.length <= 1) return

    const updatedChildren = currentParent.children.filter((_, idx) => idx !== childIndex)

    update(parentIndex, {
      ...currentParent,
      children: updatedChildren,
    })
  }

  const deleteField = (index: number) => {
    if (fields.length > 1) {
      remove(index)
    }
  }

  // Function to update field type
  const updateFieldType = (parentIndex: number, childIndex: number | null, value: string) => {
    const currentFields = getValues().fields

    if (childIndex === null) {
      // Update parent field type
      update(parentIndex, {
        ...currentFields[parentIndex],
        fieldType: value,
      })
    } else {
      // Update child field type
      const currentParent = currentFields[parentIndex]
      if (!currentParent.children) return

      const updatedChildren = [...currentParent.children]
      updatedChildren[childIndex] = {
        ...updatedChildren[childIndex],
        fieldType: value,
      }

      update(parentIndex, {
        ...currentParent,
        children: updatedChildren,
      })
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log(data)
    // Handle form submission
  }

  // Replace the JSX for the main component's return statement with this updated version
  return (
    <Container>
      <Header>Add JSON Field</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <FieldRow>
              <ExpandButton onClick={() => toggleExpand(index)}>
                {expandedFields[index] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
              </ExpandButton>
              <FieldGroup>
                <div>
                  <FieldLabel>
                    Display Name <InfoIcon>i</InfoIcon>
                  </FieldLabel>
                  <InputField placeholder="eg: Account Holder Name" {...register(`fields.${index}.displayName`)} />
                </div>
                <div>
                  <FieldLabel>
                    Field Type* <InfoIcon>i</InfoIcon>
                  </FieldLabel>
                  <Controller
                    control={control}
                    name={`fields.${index}.fieldType`}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onChange={(value) => updateFieldType(index, null, value)}
                        options={fieldTypeOptions}
                      />
                    )}
                  />
                </div>
              </FieldGroup>
            </FieldRow>

            {expandedFields[index] && (
              <NestedFieldContainer>
                {field.children?.map((child, childIndex) => (
                  <FieldRow key={`${field.id}-child-${childIndex}`}>
                    <FieldGroup>
                      <div>
                        <FieldLabel>
                          Display Name <InfoIcon>i</InfoIcon>
                        </FieldLabel>
                        <InputField
                          placeholder="eg: Account Holder Name"
                          {...register(`fields.${index}.children.${childIndex}.displayName`)}
                        />
                      </div>
                      <div>
                        <FieldLabel>
                          Field Type* <InfoIcon>i</InfoIcon>
                        </FieldLabel>
                        <Controller
                          control={control}
                          name={`fields.${index}.children.${childIndex}.fieldType`}
                          render={({ field: childField }) => (
                            <Select
                              value={childField.value}
                              onChange={(value) => updateFieldType(index, childIndex, value)}
                              options={fieldTypeOptions}
                            />
                          )}
                        />
                      </div>
                      <IconButton variant="add" type="button" onClick={() => addChildField(index)}>
                        <Plus size={20} />
                      </IconButton>
                      <IconButton variant="remove" type="button" onClick={() => removeChildField(index, childIndex)}>
                        <Minus size={20} />
                      </IconButton>
                    </FieldGroup>
                  </FieldRow>
                ))}
                <FieldRow>
                  <FieldGroup>
                    <div>
                      <FieldLabel>
                        Display Name <InfoIcon>i</InfoIcon>
                      </FieldLabel>
                      <InputField placeholder="eg: Account Holder Name" />
                    </div>
                    <div>
                      <FieldLabel>
                        Field Type* <InfoIcon>i</InfoIcon>
                      </FieldLabel>
                      <Select value="JSON" onChange={() => {}} options={fieldTypeOptions} />
                    </div>
                    <IconButton variant="delete" type="button" onClick={() => deleteField(index)}>
                      <Trash2 size={20} />
                    </IconButton>
                  </FieldGroup>
                </FieldRow>
              </NestedFieldContainer>
            )}
          </React.Fragment>
        ))}

        <ButtonContainer>
          <CancelButton type="button">Cancel</CancelButton>
          <DoneButton type="submit">Done</DoneButton>
        </ButtonContainer>
      </form>
    </Container>
  )
}

