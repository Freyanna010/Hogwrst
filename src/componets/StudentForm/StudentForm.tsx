import { FC, useState } from "react";
import {
  Button,
  DatePicker,
  Form,
  FormProps,
  Input,
  Select,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UploadFile } from "antd/es/upload/interface";
import BgCard from "../ui/BgCard";
import { FieldType } from "@/types/types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { addNewStudent } from "@/features/studentsSlice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const StudentForm: FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { Option } = Select;

  const handleChange = (info: { fileList: UploadFile[] }): void => {
    const updatedFiles: UploadFile[] = [];

    info.fileList.forEach((file: UploadFile) => {
      if (file.originFileObj) {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => {
          const newFile: UploadFile = {
            uid: file.uid,
            name: file.name,
            status: "done",
            thumbUrl: reader.result as string,
          };
          updatedFiles.push(newFile);
          if (updatedFiles.length === info.fileList.length) {
            setFileList(updatedFiles);
          }
        };
      } else {
        updatedFiles.push(file);
      }
    });
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const newObj = Object.entries(values)
      .filter(([key]) => key !== "fileList")
      .map(([key, value]) => {
        if (key === "dateOfBirth") {
          return [key, value.format("DD-MM-YYYY")];
        } else {
          return [key, value];
        }
      })
      .reduce((acc, [key, value]) => {
        acc[key] = value;

        return acc;
      }, {} as any);

    newObj.id = uuidv4();

    if (fileList.length > 0) {
      newObj.image = fileList[0].thumbUrl;
    }

    dispatch(addNewStudent(newObj));
    navigate("/students");
  };
  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <BgCard>
      <Form
        name="student"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800, marginTop: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Date of birth" name="dateOfBirth">
          <DatePicker />
        </Form.Item>

        <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
          <Select placeholder="Gender" allowClear>
            <Option value="male">male</Option>
            <Option value="female">female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.gender !== currentValues.gender
          }
        ></Form.Item>

        <Form.Item name="house" label="House" rules={[{ required: true }]}>
          <Select placeholder="choose a house" allowClear>
            <Option value="Gryffindor">Gryffindor</Option>
            <Option value="Slytherin">Slytherin</Option>
            <Option value="Ravenclaw">Ravenclaw</Option>
            <Option value="Hufflepuff">Hufflepuff</Option>
          </Select>
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.house !== currentValues.house
          }
        ></Form.Item>

        <Form.Item<FieldType>
          label="Patronus"
          name="patronus"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="fileList"
          valuePropName="fileList"
          getValueFromEvent={(e) => e?.fileList}
          label="Add photo"
          style={{}}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            <button
              style={{
                border: 0,
                backgroundColor: "#fff",
                width: "100%",
                height: "100%",
              }}
              type="button"
            >
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Photo</div>
            </button>
          </Upload>
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Create student
          </Button>
        </Form.Item>
      </Form>
    </BgCard>
  );
};

export default StudentForm;
