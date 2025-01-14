import { Box } from '@mui/material'
import Form from '@rjsf/mui'
import validator from '@rjsf/validator-ajv8'
import { memo, useEffect, useState } from 'react'
import { fetchWithTimeout } from '../../util'

export interface CCEditorProps {
    schemaURL: string
    onSubmit: (_: any) => void
    init?: any
}

export const CCEditor = memo<CCEditorProps>((props: CCEditorProps): JSX.Element => {
    const [schema, setSchema] = useState<any>()
    const [formData, setFormData] = useState<any>()

    useEffect(() => {
        setFormData(props.init)
    }, [props.init])

    useEffect(() => {
        if (!props.schemaURL) return
        fetchWithTimeout(props.schemaURL, { method: 'GET' })
            .then((e) => e.json())
            .then((e) => {
                setSchema(e)
                // if not compatible, reset form data
                if (formData) {
                    const errors = validator.rawValidation(schema, formData)
                    if (errors.errors && errors.errors.length > 0) {
                        setFormData({})
                    }
                }
            })
    }, [props.schemaURL])

    return (
        <Box>
            {schema && (
                <Form
                    schema={schema}
                    validator={validator}
                    formData={formData}
                    onChange={(e) => {
                        setFormData(e.formData)
                    }}
                    onSubmit={(e) => {
                        console.log(e.formData)
                        props.onSubmit(e.formData)
                    }}
                />
            )}
        </Box>
    )
})

CCEditor.displayName = 'CCEditor'
